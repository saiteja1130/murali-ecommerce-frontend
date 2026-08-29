import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { normalizeProduct, normalizeCategory } from '../utils/productAdapter';
import api from './api';

const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Fetch live categories from Backend API
  const fetchCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    try {
      const response = await api.get('/api/categories');
      const apiCats = response.data?.data || [];
      if (apiCats.length > 0) {
        setCategories(apiCats.map(normalizeCategory).filter(Boolean));
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.warn('Failed to load categories:', error.message);
      setCategories([]);
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  // Fetch live products from Backend API
  const fetchProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    try {
      const response = await api.get('/api/products?limit=100');
      const apiProducts = response.data?.data || [];
      if (apiProducts.length > 0) {
        const normalized = apiProducts.map(normalizeProduct).filter(Boolean);
        setProducts(normalized);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.warn('Failed to load products:', error.message);
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('INR');

  // Shopping Bag & Wishlist State (Clean initial state without mock dummy items)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('sumilux_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('sumilux_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);

  // UI Drawers, Modals & Toast State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Persistence
  useEffect(() => {
    localStorage.setItem('sumilux_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sumilux_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Stable Toast Handlers
  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((toast) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3500);
  }, [dismissToast]);

  // Drawer Toggles
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openWishlist = useCallback(() => setIsWishlistOpen(true), []);
  const closeWishlist = useCallback(() => setIsWishlistOpen(false), []);
  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  // Cart Operations
  const addToCart = useCallback((product, selectedSize, selectedColor, quantity = 1) => {
    if (!product) return;
    const size = selectedSize || product.sizes?.[0] || 'Standard';
    const color = selectedColor || product.colors?.[0] || { name: 'Standard', hex: '#1D241C' };
    const cartItemId = `${product.id || product._id}-${size}-${color.name || color}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prev, { id: cartItemId, product, quantity, selectedSize: size, selectedColor: color }];
      }
    });

    showToast({
      type: 'cart',
      title: 'Added to Bag',
      message: `${quantity}× ${product.name} (${size} / ${color.name || color})`,
      image: product.image || product.images?.[0]
    });
  }, [showToast]);

  const updateCartQuantity = useCallback((id, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  }, []);

  const removeCartItem = useCallback((id) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) {
        showToast({
          type: 'info',
          title: 'Removed from Bag',
          message: item.product?.name || 'Product removed'
        });
      }
      return prev.filter((i) => i.id !== id);
    });
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    showToast({
      type: 'info',
      title: 'Shopping Bag Emptied',
      message: 'All items have been removed.'
    });
  }, [showToast]);

  // Wishlist Operations
  const toggleWishlist = useCallback((product) => {
    if (!product) return;
    const prodId = product.id || product._id;
    setWishlist((prev) => {
      const isSaved = prev.includes(prodId);
      if (isSaved) {
        showToast({
          type: 'info',
          title: 'Removed from Wishlist',
          message: product.name
        });
        return prev.filter((id) => id !== prodId);
      } else {
        showToast({
          type: 'wishlist',
          title: 'Saved to Wishlist',
          message: product.name,
          image: product.image || product.images?.[0]
        });
        return [...prev, prodId];
      }
    });
  }, [showToast]);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  const moveWishlistToCart = useCallback((product) => {
    addToCart(product);
    removeFromWishlist(product.id || product._id);
  }, [addToCart, removeFromWishlist]);

  // Promo Code Operations
  const applyPromoCode = useCallback((code) => {
    if (code && code.trim().toUpperCase() === 'SUMI15') {
      setPromoCode('SUMI15');
      setDiscountRate(0.15);
      showToast({
        type: 'success',
        title: 'Promo Applied',
        message: '15% discount has been applied to your order.'
      });
      return true;
    }
    return false;
  }, [showToast]);

  // Financial Calculations (INR ₹ Standard)
  const cartSubtotal = useMemo(
    () => cart.reduce((acc, i) => acc + (Number(i.product?.price) || 0) * i.quantity, 0),
    [cart]
  );
  const cartItemCount = useMemo(() => cart.reduce((acc, i) => acc + i.quantity, 0), [cart]);
  const discountAmount = useMemo(() => cartSubtotal * discountRate, [cartSubtotal, discountRate]);
  const shippingCost = useMemo(
    () => (cartSubtotal >= 5000 || cart.length === 0 ? 0 : 199.0),
    [cartSubtotal, cart.length]
  );
  const cartTotal = useMemo(
    () => cartSubtotal - discountAmount + shippingCost,
    [cartSubtotal, discountAmount, shippingCost]
  );
  const wishlistProducts = useMemo(
    () => products.filter((p) => wishlist.includes(p.id || p._id)),
    [products, wishlist]
  );

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        currency,
        setCurrency,
        cart,
        wishlist,
        wishlistProducts,
        promoCode,
        discountRate,
        cartSubtotal,
        cartItemCount,
        discountAmount,
        shippingCost,
        cartTotal,
        addToCart,
        updateCartQuantity,
        removeCartItem,
        clearCart,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        moveWishlistToCart,
        applyPromoCode,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        isWishlistOpen,
        setIsWishlistOpen,
        openWishlist,
        closeWishlist,
        isSearchOpen,
        setIsSearchOpen,
        openSearch,
        closeSearch,
        isLoadingProducts,
        isLoadingCategories,
        refreshProducts: fetchProducts,
        refreshCategories: fetchCategories,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const useCart = () => useStore();

export default StoreContext;

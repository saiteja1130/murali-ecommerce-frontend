import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { normalizeProduct, normalizeCategory, normalizeMainCategory, resolveImageUrl, FALLBACK_PRODUCT_IMAGE } from '../utils/productAdapter';
import api from './api';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';

const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => {
  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoadingMainCategories, setIsLoadingMainCategories] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Fetch live main categories (Women, Kids, etc.)
  const fetchMainCategories = useCallback(async () => {
    setIsLoadingMainCategories(true);
    try {
      const response = await api.get('/api/main-categories');
      const apiMainCats = response.data?.data || [];
      if (apiMainCats.length > 0) {
        setMainCategories(apiMainCats.map(normalizeMainCategory).filter(Boolean));
      } else {
        setMainCategories([]);
      }
    } catch (error) {
      console.warn('Failed to load main categories:', error.message);
      setMainCategories([]);
    } finally {
      setIsLoadingMainCategories(false);
    }
  }, []);

  // Fetch live subcategories from Backend API
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
    fetchMainCategories();
    fetchCategories();
    fetchProducts();
  }, [fetchMainCategories, fetchCategories, fetchProducts]);

  const [activeMainCategory, setActiveMainCategory] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('INR');

  // UI Drawers, Modals & Toast State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Stable Toast Handlers
  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (toast) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => {
        dismissToast(id);
      }, 4000);
    },
    [dismissToast]
  );

  // Drawer Toggles
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openWishlist = useCallback(() => setIsWishlistOpen(true), []);
  const closeWishlist = useCallback(() => setIsWishlistOpen(false), []);
  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  // Access Cart, Wishlist, & Auth hooks
  const { token, isAuthenticated } = useAuth();
  const cartContext = useCart();
  const wishlistContext = useWishlist();

  // Wishlist products derived from catalog
  const wishlistProducts = useMemo(
    () => products.filter((p) => wishlistContext.wishlist.includes(p.id || p._id)),
    [products, wishlistContext.wishlist]
  );

  // Unified bridge for add to cart with toast
  const addToCartWithFeedback = useCallback(
    (product, selectedSize, selectedColor, quantity = 1) => {
      if (!product) return;

      if (product.isStockAvailable === false) {
        showToast({
          type: 'error',
          title: 'Out of Stock',
          message: `${product.name || 'Product'} is currently out of stock and cannot be added.`,
        });
        return;
      }

      const qty = typeof quantity === 'number' && quantity > 0 ? quantity : 1;
      const size = typeof selectedSize === 'string' && selectedSize ? selectedSize : (selectedSize?.name || product.sizes?.[0] || 'Standard');
      const color = selectedColor || product.colors?.[0] || { name: 'Standard', hex: '#1D241C' };
      const colorName = typeof color === 'object' ? (color.name || color.label || 'Standard') : (color || 'Standard');

      const imgUrl = resolveImageUrl(product.image || product.images?.[0]);

      // 1. Immediately fire the visual toast popup notification
      showToast({
        type: 'cart',
        title: 'Added to Bag',
        message: `${qty}× ${product.name || 'Item'} (${size} / ${colorName})`,
        image: imgUrl,
      });

      // 2. Perform cart state updates and backend sync
      try {
        cartContext.addToCart(product, size, color, qty);
      } catch (err) {
        console.warn('CartContext addToCart error:', err);
      }
    },
    [cartContext, showToast]
  );

  // Unified bridge for wishlist toggle with toast
  const toggleWishlistWithFeedback = useCallback(
    (product) => {
      if (!product) return;

      // If not authenticated, let wishlistContext handle login redirection without triggering toast
      if (!token || !isAuthenticated) {
        wishlistContext.toggleWishlist(product);
        return;
      }

      const prodId = product.id || product._id;
      const isSaved = wishlistContext.isWishlisted(prodId);

      wishlistContext.toggleWishlist(product);

      if (isSaved) {
        showToast({
          type: 'info',
          title: 'Removed from Wishlist',
          message: product.name,
        });
      } else {
        const imgUrl = resolveImageUrl(product.image || product.images?.[0]);
        showToast({
          type: 'wishlist',
          title: 'Saved to Wishlist',
          message: product.name,
          image: imgUrl,
        });
      }
    },
    [wishlistContext, showToast, token, isAuthenticated]
  );

  const moveWishlistToCart = useCallback(
    (product) => {
      addToCartWithFeedback(product);
      wishlistContext.removeFromWishlist(product.id || product._id);
    },
    [addToCartWithFeedback, wishlistContext]
  );

  return (
    <StoreContext.Provider
      value={{
        mainCategories,
        categories,
        products,
        activeMainCategory,
        setActiveMainCategory,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        currency,
        setCurrency,
        // Cart values (seamlessly bridged from CartContext)
        cart: cartContext.cart,
        promoCode: cartContext.promoCode,
        discountRate: cartContext.discountRate,
        discountAmount: cartContext.discountAmount,
        cartSubtotal: cartContext.cartSubtotal,
        cartItemCount: cartContext.cartItemCount,
        shippingCost: cartContext.shippingCost,
        cartTotal: cartContext.cartTotal,
        hasOutOfStockItems: cartContext.hasOutOfStockItems,
        outOfStockItems: cartContext.outOfStockItems,
        addToCart: addToCartWithFeedback,
        updateCartQuantity: cartContext.updateCartQuantity,
        removeCartItem: cartContext.removeCartItem,
        clearCart: cartContext.clearCart,
        applyPromoCode: cartContext.applyPromoCode,
        // Wishlist values (seamlessly bridged from WishlistContext)
        wishlist: wishlistContext.wishlist,
        wishlistProducts,
        toggleWishlist: toggleWishlistWithFeedback,
        removeFromWishlist: wishlistContext.removeFromWishlist,
        clearWishlist: wishlistContext.clearWishlist,
        moveWishlistToCart,
        // UI & Drawers
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
        isLoadingMainCategories,
        refreshProducts: fetchProducts,
        refreshCategories: fetchCategories,
        refreshMainCategories: fetchMainCategories,
        toasts,
        showToast,
        dismissToast,
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

export default StoreContext;

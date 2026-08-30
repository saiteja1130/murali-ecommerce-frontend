import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from './api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(undefined);

export const WishlistProvider = ({ children }) => {
  const { currentUser, token, requireAuth } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch wishlist from backend when authenticated
  useEffect(() => {
    let isMounted = true;

    const fetchBackendWishlist = async () => {
      if (!token || !currentUser) {
        setWishlist([]);
        setWishlistProducts([]);
        localStorage.removeItem('sumilux_wishlist');
        return;
      }

      setIsLoading(true);
      try {
        const res = await api.get('/api/wishlist');
        if (res.data?.success && isMounted) {
          setWishlist(res.data.wishlistIds || []);
          setWishlistProducts(res.data.data || []);
        }
      } catch (err) {
        console.warn('Wishlist backend fetch error:', err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchBackendWishlist();

    return () => {
      isMounted = false;
    };
  }, [token, currentUser?.id, currentUser?._id]);

  const toggleWishlist = useCallback(
    async (product) => {
      if (!product) return;
      const prodId = product.id || product._id;
      if (!prodId) return;

      // REQUIRE LOGIN / SIGNUP: Prompt auth modal if unauthenticated
      if (!token || !currentUser) {
        requireAuth(
          () => toggleWishlist(product),
          {
            title: 'Sign In to Save Wishlist',
            message: 'Please sign in or create an account to save items to your wishlist.',
          }
        );
        return;
      }

      const stringId = prodId.toString();
      const isCurrentlySaved = wishlist.includes(stringId);

      // 1. Optimistic UI update
      setWishlist((prev) => {
        if (isCurrentlySaved) {
          return prev.filter((id) => id !== stringId);
        } else {
          return [...prev, stringId];
        }
      });

      setWishlistProducts((prev) => {
        if (isCurrentlySaved) {
          return prev.filter((p) => (p.id || p._id || '').toString() !== stringId);
        } else {
          return [...prev, product];
        }
      });

      // 2. Persist to MongoDB backend
      try {
        const response = await api.post('/api/wishlist/toggle', { productId: stringId });
        if (response.data?.success && response.data.wishlistIds) {
          setWishlist(response.data.wishlistIds);
          if (response.data.data) {
            setWishlistProducts(response.data.data);
          }
        }
      } catch (error) {
        console.warn('Backend wishlist toggle failed:', error.message);
      }
    },
    [wishlist, token, currentUser, requireAuth]
  );

  const removeFromWishlist = useCallback(
    async (productId) => {
      if (!productId) return;
      const stringId = productId.toString();

      if (!token) return;

      // 1. Optimistic UI update
      setWishlist((prev) => prev.filter((id) => id !== stringId));
      setWishlistProducts((prev) => prev.filter((p) => (p.id || p._id || '').toString() !== stringId));

      // 2. Delete from MongoDB backend
      try {
        const response = await api.delete(`/api/wishlist/${stringId}`);
        if (response.data?.success && response.data.wishlistIds) {
          setWishlist(response.data.wishlistIds);
        }
      } catch (error) {
        console.warn('Backend wishlist removal failed:', error.message);
      }
    },
    [token]
  );

  const clearWishlist = useCallback(async () => {
    setWishlist([]);
    setWishlistProducts([]);
    localStorage.removeItem('sumilux_wishlist');

    if (token) {
      try {
        await api.delete('/api/wishlist');
      } catch (error) {
        console.warn('Backend wishlist clear failed:', error.message);
      }
    }
  }, [token]);

  const isWishlisted = useCallback(
    (productId) => {
      if (!productId || !token) return false;
      return wishlist.includes(productId.toString());
    },
    [wishlist, token]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistProducts,
        wishlistCount: wishlist.length,
        isLoading,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;

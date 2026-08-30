import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from './api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('sumilux_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('sumilux_token') || null;
  });

  // Global Auth Modal State for Action-Gating
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalConfig, setAuthModalConfig] = useState({
    mode: 'login',
    title: 'Sign In Required',
    message: 'Please sign in to proceed.',
    onSuccess: null,
  });

  const openAuthModal = useCallback(({ mode = 'login', title = 'Sign In Required', message = 'Please sign in to proceed.', onSuccess = null } = {}) => {
    setAuthModalConfig({
      mode,
      title,
      message,
      onSuccess,
    });
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const requireAuth = useCallback(
    (actionCallback, { title = 'Sign In to Proceed', message = 'Please sign in to continue.' } = {}) => {
      if (token && currentUser) {
        if (typeof actionCallback === 'function') {
          actionCallback();
        }
        return true;
      }

      // Save redirect target URL for post-login return
      try {
        const currentPath = window.location.pathname + window.location.search;
        if (currentPath && currentPath !== '/login' && currentPath !== '/signup') {
          sessionStorage.setItem('sumilux_redirect_after_login', currentPath);
        }
      } catch (e) {
        console.warn('SessionStorage error:', e);
      }

      // Direct redirection to the login page
      window.location.href = '/login';
      return false;
    },
    [token, currentUser]
  );

  // User Saved Addresses State
  const [userAddresses, setUserAddresses] = useState(() => {
    const saved = localStorage.getItem('sumilux_addresses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // User Order History State (initialized to empty without dummy fallbacks)
  const [userOrders, setUserOrders] = useState(() => {
    const saved = localStorage.getItem('sumilux_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // User Payment History State
  const [userPayments, setUserPayments] = useState(() => {
    const saved = localStorage.getItem('sumilux_payments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Fetch addresses from backend
  const fetchAddresses = useCallback(async () => {
    const storedToken = localStorage.getItem('sumilux_token');
    if (!storedToken) {
      return;
    }
    try {
      const response = await api.get('/api/users/addresses');
      if (response.data?.status) {
        const list = (response.data.data || []).map((a) => ({
          id: a._id || a.id,
          _id: a._id || a.id,
          name: a.fullName,
          fullName: a.fullName,
          phone: a.phone,
          street: a.street,
          apartment: a.apartment || '',
          city: a.city,
          state: a.state,
          postalCode: a.postalCode,
          country: a.country || 'India',
          addressType: a.addressType || 'home',
          isDefault: !!a.isDefault,
        }));
        setUserAddresses(list);
      }
    } catch (err) {
      console.error('Failed to fetch addresses from backend:', err.message);
    }
  }, []);

  // Fetch addresses whenever user logs in or token is available
  useEffect(() => {
    if (token) {
      fetchAddresses();
    } else {
      setUserAddresses([]);
    }
  }, [token, fetchAddresses]);

  // Local Storage Synchronization
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sumilux_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sumilux_user');
    }
  }, [currentUser]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('sumilux_token', token);
    } else {
      localStorage.removeItem('sumilux_token');
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('sumilux_addresses', JSON.stringify(userAddresses));
  }, [userAddresses]);

  useEffect(() => {
    localStorage.setItem('sumilux_orders', JSON.stringify(userOrders));
  }, [userOrders]);

  useEffect(() => {
    localStorage.setItem('sumilux_payments', JSON.stringify(userPayments));
  }, [userPayments]);

  // Global Auth Expiration Listener
  useEffect(() => {
    const handleAuthExpired = () => {
      setCurrentUser(null);
      setToken(null);
      setUserAddresses([]);
    };
    window.addEventListener('auth-expired', handleAuthExpired);
    return () => window.removeEventListener('auth-expired', handleAuthExpired);
  }, []);

  // Auth Actions
  const login = async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    if (response.data.status) {
      setCurrentUser(response.data.user);
      setToken(response.data.token);
      return response.data;
    }
    throw new Error(response.data.message || 'Login failed');
  };

  const requestOtp = async (email) => {
    const response = await api.post('/api/auth/request-otp', { email });
    return response.data;
  };

  const loginWithOtp = async (email, otpCode) => {
    const response = await api.post('/api/auth/login-otp', { email, otpCode });
    if (response.data.status) {
      setCurrentUser(response.data.user);
      setToken(response.data.token);
      return response.data;
    }
    throw new Error(response.data.message || 'Login failed');
  };

  const signup = async (userData) => {
    const response = await api.post('/api/auth/signup', userData);
    return response.data;
  };

  const verifyEmail = async (email, otpCode) => {
    const response = await api.post('/api/auth/verify-email', { email, otpCode });
    if (response.data.status) {
      setCurrentUser(response.data.user);
      setToken(response.data.token);
      return response.data;
    }
    throw new Error(response.data.message || 'Verification failed');
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setUserAddresses([]);
    localStorage.removeItem('sumilux_user');
    localStorage.removeItem('sumilux_token');
    localStorage.removeItem('sumilux_addresses');
  };

  const updateProfile = (updatedData) => {
    setCurrentUser((prev) => ({ ...prev, ...updatedData }));
  };

  // Address Actions with Backend Synchronization
  const addAddress = async (newAddr) => {
    try {
      const payload = {
        fullName: newAddr.fullName || newAddr.name,
        phone: newAddr.phone || currentUser?.phone || '',
        street: newAddr.street,
        apartment: newAddr.apartment || '',
        city: newAddr.city,
        state: newAddr.state,
        postalCode: newAddr.postalCode,
        country: newAddr.country || 'India',
        addressType: newAddr.addressType || 'home',
        isDefault: newAddr.isDefault !== undefined ? newAddr.isDefault : userAddresses.length === 0,
      };

      if (token) {
        const response = await api.post('/api/users/addresses', payload);
        if (response.data?.status) {
          const list = (response.data.data || []).map((a) => ({
            id: a._id || a.id,
            _id: a._id || a.id,
            name: a.fullName,
            fullName: a.fullName,
            phone: a.phone,
            street: a.street,
            apartment: a.apartment || '',
            city: a.city,
            state: a.state,
            postalCode: a.postalCode,
            country: a.country || 'India',
            addressType: a.addressType || 'home',
            isDefault: !!a.isDefault,
          }));
          setUserAddresses(list);
          return list;
        }
      } else {
        // Guest / offline fallback
        const localAddr = {
          ...payload,
          id: `addr-${Date.now()}`,
          name: payload.fullName,
        };
        setUserAddresses((prev) => {
          if (localAddr.isDefault) {
            return [...prev.map((a) => ({ ...a, isDefault: false })), localAddr];
          }
          return [...prev, localAddr];
        });
        return localAddr;
      }
    } catch (err) {
      console.error('Failed to add address:', err.message);
      throw err;
    }
  };

  const updateAddress = async (updatedAddr) => {
    const targetId = updatedAddr.id || updatedAddr._id;
    try {
      const payload = {
        fullName: updatedAddr.fullName || updatedAddr.name,
        phone: updatedAddr.phone || currentUser?.phone || '',
        street: updatedAddr.street,
        apartment: updatedAddr.apartment || '',
        city: updatedAddr.city,
        state: updatedAddr.state,
        postalCode: updatedAddr.postalCode,
        country: updatedAddr.country || 'India',
        addressType: updatedAddr.addressType || 'home',
        isDefault: updatedAddr.isDefault,
      };

      if (token) {
        const response = await api.put(`/api/users/addresses/${targetId}`, payload);
        if (response.data?.status) {
          const list = (response.data.data || []).map((a) => ({
            id: a._id || a.id,
            _id: a._id || a.id,
            name: a.fullName,
            fullName: a.fullName,
            phone: a.phone,
            street: a.street,
            apartment: a.apartment || '',
            city: a.city,
            state: a.state,
            postalCode: a.postalCode,
            country: a.country || 'India',
            addressType: a.addressType || 'home',
            isDefault: !!a.isDefault,
          }));
          setUserAddresses(list);
          return list;
        }
      } else {
        setUserAddresses((prev) =>
          prev.map((a) => {
            if (a.id === targetId) return { ...a, ...payload, name: payload.fullName };
            if (payload.isDefault) return { ...a, isDefault: false };
            return a;
          })
        );
      }
    } catch (err) {
      console.error('Failed to update address:', err.message);
      throw err;
    }
  };

  const deleteAddress = async (id) => {
    try {
      if (token) {
        const response = await api.delete(`/api/users/addresses/${id}`);
        if (response.data?.status) {
          const list = (response.data.data || []).map((a) => ({
            id: a._id || a.id,
            _id: a._id || a.id,
            name: a.fullName,
            fullName: a.fullName,
            phone: a.phone,
            street: a.street,
            apartment: a.apartment || '',
            city: a.city,
            state: a.state,
            postalCode: a.postalCode,
            country: a.country || 'India',
            addressType: a.addressType || 'home',
            isDefault: !!a.isDefault,
          }));
          setUserAddresses(list);
          return list;
        }
      } else {
        setUserAddresses((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete address:', err.message);
      throw err;
    }
  };

  const setDefaultAddress = async (id) => {
    try {
      if (token) {
        const response = await api.patch(`/api/users/addresses/${id}/default`);
        if (response.data?.status) {
          const list = (response.data.data || []).map((a) => ({
            id: a._id || a.id,
            _id: a._id || a.id,
            name: a.fullName,
            fullName: a.fullName,
            phone: a.phone,
            street: a.street,
            apartment: a.apartment || '',
            city: a.city,
            state: a.state,
            postalCode: a.postalCode,
            country: a.country || 'India',
            addressType: a.addressType || 'home',
            isDefault: !!a.isDefault,
          }));
          setUserAddresses(list);
          return list;
        }
      } else {
        setUserAddresses((prev) =>
          prev.map((a) => ({
            ...a,
            isDefault: a.id === id,
          }))
        );
      }
    } catch (err) {
      console.error('Failed to set default address:', err.message);
      throw err;
    }
  };

  // Order Placement Action
  const recordOrder = (orderData) => {
    const generatedOrderNumber = `SMLX-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: generatedOrderNumber,
      date: 'Today, ' + new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'processing',
      trackingNumber: `EXP-${Math.floor(100000000 + Math.random() * 900000000)}`,
      paymentMethod: orderData.paymentMethod || 'Online Payment',
      shippingAddress: orderData.shippingAddress || userAddresses[0] || {
        name: currentUser?.name || 'Customer',
        phone: currentUser?.phone || '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
      },
      items: (orderData.items || []).map((item) => ({
        id: item.product?.id || item.product?._id || item.id,
        name: item.product?.name || item.name,
        size: item.selectedSize,
        color: item.selectedColor?.name || 'Standard',
        price: item.product?.price || item.price,
        quantity: item.quantity,
        image: item.product?.image || item.product?.images?.[0] || item.image,
      })),
      total: orderData.total || 0,
    };

    const newPayment = {
      id: `pay-${Date.now()}`,
      transactionId: `TXN-${Math.floor(10000 + Math.random() * 90000)}-INR`,
      date: 'Today',
      method: orderData.paymentMethod || 'Online Payment',
      orderNumber: generatedOrderNumber,
      amount: orderData.total || 0,
      status: 'Settled',
    };

    setUserOrders((prev) => [newOrder, ...prev]);
    setUserPayments((prev) => [newPayment, ...prev]);

    return generatedOrderNumber;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        user: currentUser, // Alias
        token,
        isAuthenticated: !!currentUser,
        login,
        signup,
        requestOtp,
        loginWithOtp,
        verifyEmail,
        logout,
        updateProfile,
        addresses: userAddresses,
        fetchAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders: userOrders,
        payments: userPayments,
        recordOrder,
        isAuthModalOpen,
        authModalConfig,
        openAuthModal,
        closeAuthModal,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

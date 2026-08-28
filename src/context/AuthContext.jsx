import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/mockData';
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
  const [userAddresses, setUserAddresses] = useState(() => {
    const saved = localStorage.getItem('sumilux_addresses');
    if (saved) return JSON.parse(saved);

    return [
      {
        id: 'addr-1',
        name: 'Eleanor Vance (Primary Residence)',
        street: '742 Montgomery Street',
        apartment: 'Suite 1400',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94111',
        country: 'United States',
        phone: '+1 (415) 890-2144',
        isDefault: true
      },
      {
        id: 'addr-2',
        name: 'Eleanor Vance (London Mayfair Salon)',
        street: '14 New Bond Street',
        apartment: 'Private Residence 3A',
        city: 'London',
        state: 'Greater London',
        postalCode: 'W1S 3PF',
        country: 'United Kingdom',
        phone: '+44 20 7946 0912',
        isDefault: false
      }
    ];
  });

  // 3. User Order History State
  const [userOrders, setUserOrders] = useState(() => {
    const saved = localStorage.getItem('sumilux_orders');
    if (saved) return JSON.parse(saved);

    return [
      {
        id: 'ord-88219',
        orderNumber: 'SMLX-98214',
        date: 'Aug 24, 2026',
        status: 'shipped',
        trackingNumber: 'DHL-984210953',
        estimatedDelivery: 'Tomorrow, by 18:00',
        paymentMethod: 'AMEX (•••• 8821)',
        shippingAddress: {
          name: 'Eleanor Vance',
          street: '742 Montgomery Street, Suite 1400',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94111',
          country: 'United States'
        },
        items: [
          {
            id: 'prod-w-1',
            name: PRODUCTS[0]?.name || 'Tailored Double-Breasted Wool Blazer',
            size: 'M',
            color: 'Camel Gold',
            price: PRODUCTS[0]?.price || 380.0,
            quantity: 1,
            image: PRODUCTS[0]?.image || 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop'
          },
          {
            id: 'prod-a-1',
            name: 'Artisanal Italian Leather Tote',
            size: 'One Size',
            color: 'Espresso Cognac',
            price: 460.0,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop'
          }
        ],
        total: 714.0
      },
      {
        id: 'ord-77402',
        orderNumber: 'SMLX-84102',
        date: 'Jul 18, 2026',
        status: 'delivered',
        trackingNumber: 'DHL-772109440',
        paymentMethod: 'Apple Pay (•••• 4242)',
        shippingAddress: {
          name: 'Eleanor Vance',
          street: '742 Montgomery Street, Suite 1400',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94111',
          country: 'United States'
        },
        items: [
          {
            id: 'prod-w-2',
            name: 'Fluid Mulberry Silk Midi Slip Dress',
            size: 'S',
            color: 'Pearl Ivory',
            price: 290.0,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop'
          }
        ],
        total: 246.5
      },
      {
        id: 'ord-61920',
        orderNumber: 'SMLX-61920',
        date: 'Jun 04, 2026',
        status: 'delivered',
        trackingNumber: 'DHL-550192831',
        paymentMethod: 'AMEX (•••• 8821)',
        shippingAddress: {
          name: 'Eleanor Vance',
          street: '14 New Bond Street',
          city: 'London',
          state: 'Greater London',
          postalCode: 'W1S 3PF',
          country: 'United Kingdom'
        },
        items: [
          {
            id: 'prod-m-1',
            name: 'Architectural Cashmere Overcoat',
            size: 'L',
            color: 'Charcoal Black',
            price: 520.0,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop'
          }
        ],
        total: 442.0
      }
    ];
  });

  // 4. User Payment History State
  const [userPayments, setUserPayments] = useState(() => {
    const saved = localStorage.getItem('sumilux_payments');
    if (saved) return JSON.parse(saved);

    return [
      {
        id: 'pay-98214',
        transactionId: 'TXN-98214-AMEX',
        date: 'Aug 24, 2026',
        method: 'AMEX (•••• 8821)',
        orderNumber: 'SMLX-98214',
        amount: 714.0,
        status: 'Settled'
      },
      {
        id: 'pay-84102',
        transactionId: 'TXN-84102-APAY',
        date: 'Jul 18, 2026',
        method: 'Apple Pay (•••• 4242)',
        orderNumber: 'SMLX-84102',
        amount: 246.5,
        status: 'Settled'
      },
      {
        id: 'pay-61920',
        transactionId: 'TXN-61920-AMEX',
        date: 'Jun 04, 2026',
        method: 'AMEX (•••• 8821)',
        orderNumber: 'SMLX-61920',
        amount: 442.0,
        status: 'Settled'
      }
    ];
  });

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
    localStorage.removeItem('sumilux_user');
    localStorage.removeItem('sumilux_token');
  };

  const updateProfile = (updatedData) => {
    setCurrentUser((prev) => ({ ...prev, ...updatedData }));
  };

  // Address Actions
  const addAddress = (newAddr) => {
    if (newAddr.isDefault) {
      setUserAddresses((prev) => [
        ...prev.map((a) => ({ ...a, isDefault: false })),
        newAddr
      ]);
    } else {
      setUserAddresses((prev) => [...prev, newAddr]);
    }
  };

  const updateAddress = (updatedAddr) => {
    setUserAddresses((prev) =>
      prev.map((a) => {
        if (a.id === updatedAddr.id) return updatedAddr;
        if (updatedAddr.isDefault) return { ...a, isDefault: false };
        return a;
      })
    );
  };

  const deleteAddress = (id) => {
    setUserAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefaultAddress = (id) => {
    setUserAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id
      }))
    );
  };

  // Order Placement Action
  const recordOrder = (orderData) => {
    const generatedOrderNumber = `SMLX-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: generatedOrderNumber,
      date: 'Today, ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'processing',
      trackingNumber: `DHL-${Math.floor(100000000 + Math.random() * 900000000)}`,
      paymentMethod: orderData.paymentMethod || 'Credit Card (•••• 8821)',
      shippingAddress: orderData.shippingAddress || userAddresses[0] || {
        name: currentUser?.name || 'Eleanor Vance',
        street: '742 Montgomery Street',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94111',
        country: 'United States'
      },
      items: (orderData.items || []).map((item) => ({
        id: item.product.id,
        name: item.product.name,
        size: item.selectedSize,
        color: item.selectedColor?.name || 'Standard',
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      })),
      total: orderData.total || 0
    };

    const newPayment = {
      id: `pay-${Date.now()}`,
      transactionId: `TXN-${Math.floor(10000 + Math.random() * 90000)}-AUTH`,
      date: 'Today',
      method: orderData.paymentMethod || 'Credit Card (•••• 8821)',
      orderNumber: generatedOrderNumber,
      amount: orderData.total || 0,
      status: 'Settled'
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
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders: userOrders,
        payments: userPayments,
        recordOrder
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

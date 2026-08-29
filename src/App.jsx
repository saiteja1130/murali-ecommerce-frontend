/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { RootProvider, useAuth, useStore } from './context/RootContext';

// Navigation & Layout Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';

// Storefront Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';

// Account & Auth Pages
import { AccountPage } from './pages/AccountPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

// Policy & Utility Pages
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { ReturnsPolicyPage } from './pages/ReturnsPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Consume Contexts
  const {
    currentUser,
    login,
    signup,
    logout,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    orders,
    payments,
    recordOrder
  } = useAuth();

  const {
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
    openCart,
    closeCart,
    isWishlistOpen,
    openWishlist,
    closeWishlist,
    isSearchOpen,
    openSearch,
    closeSearch,
    toasts,
    showToast,
    dismissToast
  } = useStore();

  // Scroll to top automatically when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Keyboard shortcut for search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openSearch]);

  const handleScrollToLookbook = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('lookbook-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      const el = document.getElementById('lookbook-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDirectCheckout = (product, selectedSize, selectedColor, quantity = 1) => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handlePlaceOrderFlow = (orderData) => {
    const orderNumber = recordOrder({
      ...orderData,
      items: cart,
      total: cartTotal
    });
    clearCart();
    showToast({
      type: 'success',
      title: 'Order Confirmed',
      message: `Order #${orderNumber} placed successfully!`
    });
    return orderNumber;
  };

  const handleLoginSuccess = async (userData) => {
    await login(userData.email || 'eleanor.vance@sumilux.com', 'demo');
    showToast({
      type: 'success',
      title: 'Welcome Back',
      message: `Signed in as ${userData.name || 'Patron'}`
    });
  };

  const handleSignupSuccess = async (userData) => {
    await signup(userData);
    showToast({
      type: 'success',
      title: 'Account Created',
      message: `Welcome to SUMILUX, ${userData.firstName || 'Patron'}!`
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3] text-[#1A1A1A] font-sans flex flex-col selection:bg-[#C8A87C]/30 selection:text-[#1A1A1A]">
      {/* 1. Header (Sticky with Navigation, Search, Wishlist, Cart, Account) */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenSearch={openSearch}
        categories={categories}
        cartCount={cartItemCount}
        cartTotal={cartSubtotal}
        wishlistCount={wishlist.length}
        currency={currency}
        onSelectCurrency={setCurrency}
        onScrollToLookbook={handleScrollToLookbook}
        currentUser={currentUser}
        onLogout={logout}
      />

      <main className="flex-1">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <HomePage
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlistIds={wishlist}
                categories={categories}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery('')}
                onClickProduct={(p) => navigate(`/product/${p.id}`)}
              />
            }
          />

          {/* Dedicated All Products & Category Specific Routes */}
          <Route
            path="/products"
            element={
              <ProductsPage
                allProducts={products}
                categories={categories}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlistIds={wishlist}
                onNavigateToCategory={setActiveCategory}
              />
            }
          />
          <Route
            path="/products/:category"
            element={
              <ProductsPage
                allProducts={products}
                categories={categories}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlistIds={wishlist}
                onNavigateToCategory={setActiveCategory}
              />
            }
          />
          <Route
            path="/collections/:category"
            element={
              <ProductsPage
                allProducts={products}
                categories={categories}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlistIds={wishlist}
                onNavigateToCategory={setActiveCategory}
              />
            }
          />

          {/* Product Details Route */}
          <Route
            path="/product/:id"
            element={
              <ProductDetailPage
                allProducts={products}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlistIds={wishlist}
                onNavigateToCategory={setActiveCategory}
                onDirectCheckout={handleDirectCheckout}
              />
            }
          />

          {/* Cart Route */}
          <Route
            path="/cart"
            element={
              <CartPage
                items={cart}
                onUpdateQuantity={updateCartQuantity}
                onRemoveItem={removeCartItem}
                onClearCart={clearCart}
                onProceedToCheckout={() => navigate('/checkout')}
                promoCode={promoCode}
                onApplyPromoCode={applyPromoCode}
                discountRate={discountRate}
                allProducts={products}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlistIds={wishlist}
              />
            }
          />

          {/* Dedicated Checkout Route */}
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                items={cart}
                onClearCart={clearCart}
                promoCode={promoCode}
                onApplyPromoCode={applyPromoCode}
                discountRate={discountRate}
                onPlaceOrder={handlePlaceOrderFlow}
                currentUser={currentUser}
                addresses={addresses}
              />
            }
          />

          {/* Wishlist Route */}
          <Route
            path="/wishlist"
            element={
              <WishlistPage
                wishlistProducts={wishlistProducts}
                onRemoveFromWishlist={removeFromWishlist}
                onClearWishlist={clearWishlist}
                onAddToCart={addToCart}
                allProducts={products}
                onToggleWishlist={toggleWishlist}
                wishlistIds={wishlist}
              />
            }
          />

          {/* User Account Portal Suite Routes */}
          <Route
            path="/account"
            element={
              <AccountPage
                currentUser={currentUser}
                onLogout={logout}
                orders={orders}
                addresses={addresses}
                onAddAddress={addAddress}
                onUpdateAddress={updateAddress}
                onDeleteAddress={deleteAddress}
                onSetDefaultAddress={setDefaultAddress}
                payments={payments}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/account/:tab"
            element={
              <AccountPage
                currentUser={currentUser}
                onLogout={logout}
                orders={orders}
                addresses={addresses}
                onAddAddress={addAddress}
                onUpdateAddress={updateAddress}
                onDeleteAddress={deleteAddress}
                onSetDefaultAddress={setDefaultAddress}
                payments={payments}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/account/orders/:id"
            element={
              <AccountPage
                currentUser={currentUser}
                onLogout={logout}
                orders={orders}
                addresses={addresses}
                onAddAddress={addAddress}
                onUpdateAddress={updateAddress}
                onDeleteAddress={deleteAddress}
                onSetDefaultAddress={setDefaultAddress}
                payments={payments}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <AccountPage
                currentUser={currentUser}
                onLogout={logout}
                orders={orders}
                addresses={addresses}
                onAddAddress={addAddress}
                onUpdateAddress={updateAddress}
                onDeleteAddress={deleteAddress}
                onSetDefaultAddress={setDefaultAddress}
                payments={payments}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/orders/:id"
            element={
              <AccountPage
                currentUser={currentUser}
                onLogout={logout}
                orders={orders}
                addresses={addresses}
                onAddAddress={addAddress}
                onUpdateAddress={updateAddress}
                onDeleteAddress={deleteAddress}
                onSetDefaultAddress={setDefaultAddress}
                payments={payments}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/addresses"
            element={
              <AccountPage
                currentUser={currentUser}
                onLogout={logout}
                orders={orders}
                addresses={addresses}
                onAddAddress={addAddress}
                onUpdateAddress={updateAddress}
                onDeleteAddress={deleteAddress}
                onSetDefaultAddress={setDefaultAddress}
                payments={payments}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/payments"
            element={
              <AccountPage
                currentUser={currentUser}
                onLogout={logout}
                orders={orders}
                addresses={addresses}
                onAddAddress={addAddress}
                onUpdateAddress={updateAddress}
                onDeleteAddress={deleteAddress}
                onSetDefaultAddress={setDefaultAddress}
                payments={payments}
                onAddToCart={addToCart}
              />
            }
          />

          {/* Trust, Policy & Information Routes */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
          <Route path="/returns-policy" element={<ReturnsPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/support" element={<Navigate to="/contact" replace />} />
          <Route path="/help" element={<Navigate to="/contact" replace />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<SignupPage onSignupSuccess={handleSignupSuccess} />} />

          {/* Error 404 Route */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer onSelectCategory={setActiveCategory} onScrollToLookbook={handleScrollToLookbook} />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeCartItem}
        onProceedToCheckout={() => {
          closeCart();
          navigate('/checkout');
        }}
        promoCode={promoCode}
        onApplyPromoCode={applyPromoCode}
        discountRate={discountRate}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={closeWishlist}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={removeFromWishlist}
        onMoveToCart={moveWishlistToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={closeSearch}
        products={products}
        onSelectProduct={(p) => {
          closeSearch();
          navigate(`/product/${p.id}`);
        }}
        onSearchSubmit={(query) => {
          closeSearch();
          navigate(`/products?search=${encodeURIComponent(query)}`);
        }}
      />

      {/* Global Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export const App = () => {
  return (
    <RootProvider>
      <AppContent />
    </RootProvider>
  );
};

export default App;

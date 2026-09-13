import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles, ArrowRight, User as UserIcon, LogOut, MapPin, HelpCircle } from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

export const Header = ({
  currentPage,
  onNavigateToPage,
  activeCategory,
  onSelectCategory,
  onOpenSearch,
  mainCategories = [],
  categories = [],
  cartCount,
  cartTotal,
  wishlistCount,
  currency,
  onSelectCurrency,
  currentUser,
  onLogout
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navCategories = React.useMemo(() => {
    const list = [{ label: 'All Products', slug: 'all', path: '/products' }];
    if (Array.isArray(mainCategories) && mainCategories.length > 0) {
      mainCategories.forEach((mCat) => {
        const slug = (mCat.slug || mCat.name || '').toLowerCase();
        if (slug && !list.some((item) => item.slug.toLowerCase() === slug)) {
          list.push({
            label: mCat.name,
            slug: slug,
            path: `/products/${slug}`
          });
        }
      });
    } else {
      list.push({ label: 'Women', slug: 'women', path: '/products/women' });
      list.push({ label: 'Kids', slug: 'kids', path: '/products/kids' });
    }
    return list;
  }, [mainCategories]);

  const currencies = [
    { code: 'INR', symbol: '₹', label: 'INR (₹)' }
  ];

  const handleCategoryClick = (cat) => {
    const slug = typeof cat === 'string' ? cat : cat.slug;
    if (onSelectCategory) onSelectCategory(slug);
    setMobileMenuOpen(false);
    if (!slug || slug === 'All' || slug === 'all') {
      navigate('/products');
    } else {
      navigate(`/products/${slug.toLowerCase()}`);
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    if (onNavigateToPage)
      onNavigateToPage('home');
    onSelectCategory('All');
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCategoryActive = (cat) => {
    if (cat.slug === 'All' && location.pathname === '/products') return true;
    if (location.pathname === `/products/${cat.slug.toLowerCase()}`) return true;
    if (location.pathname === '/' && activeCategory === cat.slug) return true;
    return false;
  };

  const isCurrentPath = (path) => {
    if (path === '/' && location.pathname === '/')
      return true;
    if (path !== '/' && location.pathname.startsWith(path))
      return true;
    return false;
  };

  return (
    <>
      <header
        id="main-site-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-[#E8E4DC] py-2.5'
          : 'bg-[#FAF8F5] border-b border-[#E8E4DC]/60 py-3.5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Mobile Hamburger (< lg) */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-[#1D241C] hover:text-[#C69E58] transition-colors focus:outline-none cursor-pointer"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Center on mobile, Left on desktop: Brand Logo */}
          <div className="flex items-center justify-center lg:justify-start flex-1 lg:flex-initial">
            <Link to="/" onClick={handleBrandClick} className="group flex items-center gap-2.5 py-1">
              <img
                src="/assets/images/Logo2.png"
                alt="Murari's Glam & Glow"
                className="h-10 sm:h-14 w-44 object-full transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Main Navigation">
            {navCategories.map((cat) => {
              const isActive = isCategoryActive(cat);
              return (
                <button
                  key={cat.slug}
                  id={`nav-item-${cat.slug.toLowerCase()}`}
                  onClick={() => handleCategoryClick(cat)}
                  className={`text-xs xl:text-sm font-semibold tracking-wider uppercase transition-all py-1.5 whitespace-nowrap relative group cursor-pointer ${isActive ? 'text-[#506040] font-bold' : 'text-[#6B6864] hover:text-[#1D241C]'
                    }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#C69E58] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls:
              On Mobile: ONLY Search is displayed on the right -> [Menu] [Logo] [Search]
              On Desktop: Search Trigger, User Account, Wishlist, Cart
          */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Mobile Search Button (Rightmost element on mobile) */}
            <button
              id="mobile-search-btn"
              onClick={onOpenSearch}
              className="p-2 -mr-2 text-[#1D241C] hover:text-[#C69E58] transition-colors cursor-pointer lg:hidden"
              aria-label="Search store"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Desktop Search Trigger */}
            <button
              id="desktop-search-trigger"
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-2 text-xs font-medium text-[#6B6864] hover:text-[#1A1A1A] bg-white border border-[#E8E3DE] px-3 py-2 rounded-xs transition-all shadow-2xs cursor-pointer mr-1"
            >
              <Search className="w-3.5 h-3.5 text-[#1A1A1A]" />
              <span className="text-neutral-400 whitespace-nowrap">Search styles, fabrics...</span>
              <kbd className="hidden xl:inline-block bg-[#F8F6F3] text-neutral-400 text-[10px] px-1.5 py-0.5 rounded border border-[#E8E3DE]">
                ⌘K
              </kbd>
            </button>

            {/* User Account / Login Button (Desktop only) */}
            <div className="relative hidden lg:block">
              {currentUser ? (
                <div>
                  <button
                    id="header-user-account-btn"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="p-2 text-[#1A1A1A] hover:text-[#C8A87C] transition-colors rounded-full hover:bg-white/80 flex items-center gap-1.5 cursor-pointer"
                    title={`Logged in as ${currentUser.name}`}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold font-mono">
                      {currentUser.name.charAt(0)}
                    </div>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#E8E3DE] rounded-[4px] shadow-xl py-2 z-50 animate-fade-in text-xs">
                      <div className="px-4 py-2 border-b border-[#E8E3DE]">
                        <p className="font-semibold text-[#1A1A1A] truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-[#6B6B6B] font-mono uppercase tracking-wider">My Account</p>
                      </div>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigate('/account');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#F8F6F3] text-[#1A1A1A] transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigate('/account/orders');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#F8F6F3] text-[#1A1A1A] transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span>My Orders</span>
                        <span className="text-[10px] font-mono text-[#A68758]">Active</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigate('/account/addresses');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#F8F6F3] text-[#1A1A1A] transition-colors cursor-pointer"
                      >
                        Saved Addresses
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onNavigateToPage) onNavigateToPage('wishlist');
                          navigate('/wishlist');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#F8F6F3] text-[#1A1A1A] transition-colors cursor-pointer"
                      >
                        Saved Wishlist
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          if (onNavigateToPage) onNavigateToPage('cart');
                          navigate('/cart');
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-[#F8F6F3] text-[#1A1A1A] transition-colors cursor-pointer"
                      >
                        Shopping Bag
                      </button>

                      <div className="border-t border-[#E8E3DE] mt-1 pt-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            navigate('/contact');
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-[#687163] hover:text-[#1D241C] transition-colors cursor-pointer text-xs"
                        >
                          Help & Contact Us
                        </button>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            setShowLogoutModal(true);
                          }}
                          className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors font-medium cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  id="header-login-btn"
                  onClick={() => {
                    if (onNavigateToPage) onNavigateToPage('login');
                    navigate('/login');
                  }}
                  className={`p-2 transition-colors rounded-full hover:bg-white/80 cursor-pointer ${isCurrentPath('/login') || isCurrentPath('/signup')
                    ? 'text-[#C8A87C]'
                    : 'text-[#1A1A1A] hover:text-[#C8A87C]'
                    }`}
                  aria-label="Sign In or Register"
                  title="Sign In / Register"
                >
                  <UserIcon className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Button (Desktop only) */}
            <button
              id="header-wishlist-btn"
              onClick={() => {
                if (onNavigateToPage) onNavigateToPage('wishlist');
                navigate('/wishlist');
              }}
              className={`relative p-2 transition-colors rounded-full hover:bg-white/80 cursor-pointer items-center justify-center hidden lg:flex ${isCurrentPath('/wishlist') ? 'text-[#C8A87C]' : 'text-[#1A1A1A] hover:text-[#C8A87C]'
                }`}
              aria-label={`Wishlist with ${wishlistCount} items`}
              title="Saved Wishlist Page"
            >
              <Heart
                className={`w-5 h-5 ${wishlistCount > 0 || isCurrentPath('/wishlist') ? 'fill-[#C8A87C] text-[#C8A87C]' : ''
                  }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#1A1A1A] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button (Desktop only) */}
            <button
              id="header-cart-btn"
              onClick={() => {
                if (onNavigateToPage) onNavigateToPage('cart');
                navigate('/cart');
              }}
              className={`items-center gap-2 px-3.5 py-2 rounded-xs transition-colors shadow-2xs group cursor-pointer shrink-0 hidden lg:flex ${isCurrentPath('/cart')
                ? 'bg-[#C8A87C] text-[#1A1A1A]'
                : 'bg-[#1A1A1A] text-white hover:bg-[#C8A87C] hover:text-[#1A1A1A]'
                }`}
              aria-label={`Shopping cart with ${cartCount} items`}
              title="Shopping Bag Page"
            >
              <div className="relative flex items-center">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-3.5 h-3.5 bg-[#C8A87C] group-hover:bg-[#1A1A1A] text-[#1A1A1A] group-hover:text-white text-[9px] font-bold rounded-full flex items-center justify-center transition-colors">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
          />

          <div className="relative w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">
            {/* Top Brand & Close Bar */}
            <div className="p-5 pb-4  flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-20">
              <div className="flex items-center gap-2.5">
                <img
                  src="/assets/images/Logo2.png"
                  alt="Murari's Glam & Glow"
                  className="h-14 w-auto object-contain"
                />

              </div>
              <button
                id="close-mobile-nav-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 flex-1 space-y-6">
              {/* Account / User Card */}
              {currentUser ? (
                <div className="bg-white rounded-lg p-4 border border-[#E8E4DC] shadow-2xs space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1D241C] text-[#C69E58] border border-[#C69E58]/30 flex items-center justify-center text-sm font-bold font-mono shrink-0 shadow-xs">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-sm text-[#1D241C] truncate">{currentUser.name}</p>
                      </div>
                      <p className="text-[11px] text-[#6B6864] truncate">{currentUser.email || currentUser.phone || 'Member'}</p>
                    </div>
                  </div>

                  {/* Profile & Account Quick Links */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E8E4DC]/80">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate('/account');
                      }}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1D241C] bg-[#FAF8F5] hover:bg-[#EFECE6] rounded-sm transition-colors text-left cursor-pointer"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-[#C69E58]" />
                      <span>My Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate('/account/orders');
                      }}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#1D241C] bg-[#FAF8F5] hover:bg-[#EFECE6] rounded-sm transition-colors text-left cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#506040]" />
                      <span>My Orders</span>
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate('/contact');
                      }}
                      className="flex col-span-2 justify-center items-center gap-2 px-3 py-2 text-xs font-medium text-[#1D241C] bg-[#FAF8F5] hover:bg-[#EFECE6] rounded-sm transition-colors text-left cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-[#506040]" />
                      <span>Help & Support</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-4 border border-[#E8E4DC] shadow-2xs space-y-3">
                  <div className="space-y-1">
                    <p className="font-serif text-sm font-bold text-[#1D241C]">Welcome to Murari's</p>
                    <p className="text-xs text-[#6B6864]">Sign in for an exclusive shopping experience.</p>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onNavigateToPage) onNavigateToPage('login');
                      navigate('/login');
                    }}
                    className="w-full py-2.5 px-4 bg-[#1D241C] text-[#FAF8F5] hover:bg-[#2A3428] rounded-sm font-semibold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <UserIcon className="w-4 h-4 text-[#C69E58]" />
                    <span>Member Sign In</span>
                  </button>
                </div>
              )}

              {/* Wishlist & Bag Highlights in Drawer */}
              <div className="space-y-1 bg-white rounded-lg p-2 border border-[#E8E4DC] shadow-2xs">
                {/* Wishlist Nav Button */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateToPage) onNavigateToPage('wishlist');
                    navigate('/wishlist');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-sm font-medium transition-colors cursor-pointer ${isCurrentPath('/wishlist') ? 'bg-[#FAF8F5] text-[#C69E58] font-semibold' : 'text-[#1D241C] hover:bg-[#FAF8F5]'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-[#C69E58] text-[#C69E58]' : 'text-[#6B6864]'}`} />
                    <span>Saved Wishlist</span>
                  </div>
                  {wishlistCount > 0 ? (
                    <span className="px-2 py-0.5 text-[11px] font-bold bg-[#FAF8F5] text-[#C69E58] border border-[#C69E58]/30 rounded-full">
                      {wishlistCount} items
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-neutral-300" />
                  )}
                </button>

                {/* Shopping Bag Nav Button */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateToPage) onNavigateToPage('cart');
                    navigate('/cart');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-sm font-medium transition-colors cursor-pointer ${isCurrentPath('/cart') ? 'bg-[#FAF8F5] text-[#1D241C] font-semibold' : 'text-[#1D241C] hover:bg-[#FAF8F5]'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-[#6B6864]" />
                    <span>Shopping Bag</span>
                  </div>
                  {cartCount > 0 ? (
                    <span className="px-2 py-0.5 text-[11px] font-bold bg-[#1D241C] text-white rounded-full">
                      {cartCount} items
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-neutral-300" />
                  )}
                </button>
              </div>

              {/* Shop By Category */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B6864] px-1">
                  Shop By Category
                </p>
                <div className="bg-white rounded-lg divide-y divide-[#E8E4DC]/60 border border-[#E8E4DC] shadow-2xs overflow-hidden">
                  {navCategories.map((cat) => {
                    const isActive = isCategoryActive(cat);
                    return (
                      <button
                        key={cat.slug}
                        onClick={() => handleCategoryClick(cat)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors cursor-pointer ${isActive ? 'bg-[#FAF8F5] text-[#506040] font-semibold' : 'text-[#1D241C] hover:bg-[#FAF8F5]'
                          }`}
                      >
                        <span>{cat.label}</span>
                        <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#506040]' : 'text-neutral-300'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer with Sign Out */}
            {currentUser && (
              <div className="p-5 border-t border-[#E8E4DC] bg-white">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowLogoutModal(true);
                  }}
                  className="w-full py-2.5 text-center text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-sm font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header Sign Out Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false);
          onLogout();
        }}
        variant="logout"
        title="Confirm Sign Out?"
        message="Are you sure you want to sign out of your Sumilux account? Your bag and saved wishlist will remain secure for your next visit."
        confirmText="Sign Out"
        cancelText="Stay Signed In"
      />
    </>
  );
};

export default Header;

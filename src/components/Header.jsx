import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles, ArrowRight, User as UserIcon, LogOut } from 'lucide-react';

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
    { code: 'USD', symbol: '$', label: 'INR (₹)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
    { code: 'CAD', symbol: 'CA$', label: 'CAD ($)' }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Mobile Hamburger + Search */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-[#1D241C] hover:text-[#C69E58] transition-colors focus:outline-none cursor-pointer"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              id="mobile-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-[#1D241C] hover:text-[#C69E58] transition-colors cursor-pointer"
              aria-label="Search store"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center shrink-0">
            <Link to="/" onClick={handleBrandClick} className="group flex items-center gap-2.5 py-1">
              <img
                src="/assets/images/Logo.png"
                alt="Murari's Glam & Glow"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-serif text-lg md:text-xl font-bold tracking-[0.12em] text-[#1D241C] group-hover:text-[#506040] transition-colors leading-tight">
                  MURARI'S
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C69E58] font-semibold leading-none">
                  GLAM & GLOW
                </span>
              </div>
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

          {/* Right Action Controls: Search, User, Wishlist, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
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

            {/* User Account / Login Button */}
            <div className="relative">
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
                            onLogout();
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

            {/* Wishlist Button (Navigates to Wishlist Page) */}
            <button
              id="header-wishlist-btn"
              onClick={() => {
                if (onNavigateToPage) onNavigateToPage('wishlist');
                navigate('/wishlist');
              }}
              className={`relative p-2 transition-colors rounded-full hover:bg-white/80 cursor-pointer flex items-center justify-center ${isCurrentPath('/wishlist') ? 'text-[#C8A87C]' : 'text-[#1A1A1A] hover:text-[#C8A87C]'
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

            {/* Cart Button (Navigates to Cart Page) */}
            <button
              id="header-cart-btn"
              onClick={() => {
                if (onNavigateToPage) onNavigateToPage('cart');
                navigate('/cart');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xs transition-colors shadow-2xs group cursor-pointer shrink-0 ${isCurrentPath('/cart')
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
              <span className="inline-block text-xs font-semibold tracking-wider uppercase">
                {cartCount > 0 ? `₹${cartTotal.toFixed(2)}` : 'Bag'}
              </span>
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

          <div className="relative w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#E8E4DC]">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/assets/images/Logo.png"
                    alt="Murari's Glam & Glow"
                    className="h-9 w-auto object-contain"
                  />
                  <div>
                    <div className="font-serif text-base font-bold tracking-wider text-[#1D241C]">
                      MURARI'S
                    </div>
                    <div className="text-[8px] uppercase tracking-[0.2em] text-[#C69E58] font-medium">
                      GLAM & GLOW
                    </div>
                  </div>
                </div>
                <button
                  id="close-mobile-nav-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-neutral-600 hover:text-black cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation List */}
              <div className="py-6 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#6B6864] mb-2">
                  Shop By Category
                </p>
                {navCategories.map((cat) => {
                  const isActive = isCategoryActive(cat);
                  return (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategoryClick(cat)}
                      className={`w-full flex items-center justify-between py-2 text-left text-base font-medium transition-colors cursor-pointer ${isActive ? 'text-[#506040] font-semibold' : 'text-[#1D241C]'
                        }`}
                    >
                      <span>{cat.label}</span>
                      <ArrowRight className="w-4 h-4 text-neutral-400" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Footer Auth / Settings */}
            <div className="pt-6 border-t border-[#E8E3DE] space-y-4 text-sm">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold font-mono">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">{currentUser.name}</p>
                      <p className="text-xs text-[#6B6864]">{currentUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full py-2.5 text-center text-rose-600 bg-rose-50 rounded-xs font-semibold uppercase tracking-wider text-xs cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateToPage) onNavigateToPage('login');
                    navigate('/login');
                  }}
                  className="w-full py-2.5 text-center bg-[#1A1A1A] text-white rounded-xs font-semibold uppercase tracking-wider text-xs cursor-pointer"
                >
                  Member Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

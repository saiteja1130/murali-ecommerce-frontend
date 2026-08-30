import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    authModalConfig,
    closeAuthModal,
    login,
    signup,
  } = useAuth();

  const [mode, setMode] = useState(authModalConfig.mode || 'login'); // 'login' | 'signup'

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Feedback state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessNotice('');
    setIsLoading(true);

    try {
      await login(loginEmail.trim(), loginPassword);
      setSuccessNotice('Signed in successfully! Updating your selection...');
      
      setTimeout(() => {
        closeAuthModal();
        if (typeof authModalConfig.onSuccess === 'function') {
          authModalConfig.onSuccess();
        }
      }, 500);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessNotice('');

    if (signupPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        name: signupName.trim(),
        email: signupEmail.trim().toLowerCase(),
        phone: signupPhone.trim(),
        password: signupPassword,
      });

      // Auto-login after successful registration
      await login(signupEmail.trim().toLowerCase(), signupPassword);
      setSuccessNotice('Account created successfully! Updating your selection...');

      setTimeout(() => {
        closeAuthModal();
        if (typeof authModalConfig.onSuccess === 'function') {
          authModalConfig.onSuccess();
        }
      }, 500);
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. This email may already be in use.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in text-[#1D241C]">
      <div
        className="relative bg-white rounded-2xl border border-[#E8E4DC] shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-5 overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-widest bg-[#FAF8F5] text-[#C69E58] font-bold border border-[#E8E4DC]">
              <Sparkles className="w-3 h-3 text-[#C69E58]" />
              <span>Glam & Glow Patron Access</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1D241C] pt-1">
              {authModalConfig.title || (mode === 'login' ? 'Sign In to Your Account' : 'Create an Account')}
            </h3>
            <p className="text-xs text-[#687163] leading-relaxed">
              {authModalConfig.message || (mode === 'login' ? 'Sign in to sync your bag, wishlist, and orders.' : 'Join to enjoy instant checkout and track orders.')}
            </p>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 text-neutral-400 hover:text-black hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Sign In vs Create Account */}
        <div className="grid grid-cols-2 p-1 bg-[#FAF8F5] rounded-xl border border-[#E8E4DC]">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg('');
              setSuccessNotice('');
            }}
            className={`py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-[#1D241C] text-white shadow-2xs font-bold'
                : 'text-[#687163] hover:text-[#1D241C]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMsg('');
              setSuccessNotice('');
            }}
            className={`py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-[#1D241C] text-white shadow-2xs font-bold'
                : 'text-[#687163] hover:text-[#1D241C]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMsg}</span>
          </div>
        )}

        {/* Success Alert */}
        {successNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Mode 1: Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C]"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Mode 2: Signup Form */}
        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] mb-1">
                Full Name *
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] mb-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs font-mono text-[#1D241C]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] mb-1">
                Create Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showSignupPassword ? 'text' : 'password'}
                  required
                  placeholder="At least 6 characters"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C]"
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;

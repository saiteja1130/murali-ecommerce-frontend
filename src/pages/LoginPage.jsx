import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, requestOtp, loginWithOtp } = useAuth();

  // Login Mode: 'password' | 'otp'
  const [loginMode, setLoginMode] = useState('password');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP Login Stage
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Status & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // Forgot Password Modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Countdown timer for OTP
  useEffect(() => {
    let timer;
    if (isOtpSent && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, resendTimer]);

  // Handle Mode Change
  const handleSwitchMode = (mode) => {
    setLoginMode(mode);
    setErrorMessage('');
    setSuccessNotice('');
    setIsOtpSent(false);
    setOtpCode(['', '', '', '', '', '']);
  };

  // 1. Password Login Submit
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessNotice('');

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      const redirectUrl = sessionStorage.getItem('sumilux_redirect_after_login') || '/';
      sessionStorage.removeItem('sumilux_redirect_after_login');
      navigate(redirectUrl);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Request OTP Code for Email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessNotice('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address to receive an OTP.');
      return;
    }

    setIsLoading(true);
    try {
      await requestOtp(email);
      setIsOtpSent(true);
      setResendTimer(60);
      setCanResend(false);
      setSuccessNotice(`A 6-digit login OTP code has been sent to ${email}`);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpCode];
    newOtp[index] = value.slice(-1);
    setOtpCode(newOtp);

    // Auto-focus next box
    if (value && index < 5) {
      const nextInput = document.getElementById(`login-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`login-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setCanResend(false);
    setResendTimer(60);
    try {
      await requestOtp(email);
      setSuccessNotice(`A new 6-digit login OTP code was sent to ${email}`);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Failed to resend OTP');
    }
  };

  // 3. Verify OTP Login Submit
  const handleVerifyOtpLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const fullEnteredOtp = otpCode.join('');

    if (fullEnteredOtp.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit OTP code.');
      return;
    }

    setIsLoading(true);
    try {
      await loginWithOtp(email, fullEnteredOtp);
      const redirectUrl = sessionStorage.getItem('sumilux_redirect_after_login') || '/';
      sessionStorage.removeItem('sumilux_redirect_after_login');
      navigate(redirectUrl);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Invalid or expired OTP code.');
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password Submit
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSubmitted(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSubmitted(false);
      setForgotEmail('');
      setSuccessNotice(`Password reset instructions sent to ${forgotEmail}`);
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl border border-[#E8E4DC] shadow-xl animate-fade-in space-y-7 font-sans text-[#1D241C]">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex flex-col items-center group focus:outline-none">
            <img
              src="/assets/images/Logo.png"
              alt="Murari's Glam & Glow"
              className="h-16 w-auto object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-serif text-2xl font-bold tracking-[0.14em] text-[#1D241C] group-hover:text-[#506040] transition-colors mt-2">
              MURARI'S
            </span>
          </Link>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#506040] font-semibold">
            WELCOME BACK
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#1D241C] pt-1">
            Log In to Your Account
          </h1>
          <p className="text-xs text-[#687163]">
            Access your orders, saved addresses, and wishlist.
          </p>
        </div>

        {/* Dual Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleSwitchMode('password')}
            className={`py-2 text-center rounded-lg transition-all cursor-pointer ${
              loginMode === 'password'
                ? 'bg-white text-[#1D241C] shadow-xs font-bold'
                : 'text-[#687163] hover:text-[#1D241C]'
            }`}
          >
            Password Login
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode('otp')}
            className={`py-2 text-center rounded-lg transition-all cursor-pointer ${
              loginMode === 'otp'
                ? 'bg-white text-[#1D241C] shadow-xs font-bold'
                : 'text-[#687163] hover:text-[#1D241C]'
            }`}
          >
            Email OTP Login
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl animate-shake">
            {errorMessage}
          </div>
        )}

        {/* Success Notice */}
        {successNotice && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{successNotice}</span>
            </div>
            {generatedOtp && (
              <div className="text-[11px] text-emerald-700 font-mono">
                OTP Code: <strong>{generatedOtp}</strong>
              </div>
            )}
          </div>
        )}

        {/* 1. PASSWORD LOGIN FORM */}
        {loginMode === 'password' && (
          <form onSubmit={handlePasswordLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-[#1D241C]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C]">
                  Password *
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] text-[#506040] hover:underline cursor-pointer font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-[#1D241C]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#1D241C] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-[#687163] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E8E4DC] text-[#506040] focus:ring-[#506040]"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : (
                <>
                  <span>Log In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* 2. EMAIL OTP LOGIN FORM */}
        {loginMode === 'otp' && (
          <div className="space-y-4 text-xs">
            {!isOtpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@example.com"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-[#1D241C]"
                    />
                  </div>
                  <span className="text-[10px] text-[#687163] mt-1 block">
                    We will send a 6-digit one-time passcode to your email.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending OTP...</span>
                    </div>
                  ) : (
                    <>
                      <span>Send Login OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtpLogin} className="space-y-5 animate-fade-in">
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] text-center">
                    Enter the 6-Digit Code
                  </label>
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {otpCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`login-otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-10 h-12 sm:w-12 sm:h-14 text-center font-mono text-lg font-bold bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#506040] focus:ring-2 focus:ring-[#506040]/30 text-[#1D241C]"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E8E4DC]">
                  <button
                    type="button"
                    onClick={() => setIsOtpSent(false)}
                    className="text-[#687163] hover:text-[#1D241C] flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Change Email</span>
                  </button>

                  <button
                    type="button"
                    disabled={!canResend}
                    onClick={handleResendOtp}
                    className={`flex items-center gap-1 font-semibold ${
                      canResend
                        ? 'text-[#506040] hover:underline cursor-pointer'
                        : 'text-[#9E9B97] cursor-not-allowed'
                    }`}
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <>
                      <span>Verify & Log In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer Link to Signup */}
        <div className="pt-4 border-t border-[#E8E4DC] text-center text-xs text-[#687163]">
          Don't have an account yet?{' '}
          <Link to="/signup" className="font-bold text-[#1D241C] hover:text-[#506040] transition-colors underline ml-1">
            Sign Up
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in text-[#1D241C]">
          <div className="bg-white max-w-sm w-full p-6 sm:p-8 rounded-2xl border border-[#E8E4DC] shadow-2xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1D241C]">Reset Password</h3>
            <p className="text-xs text-[#687163]">
              Enter your registered email address and we'll send you instructions to reset your password.
            </p>
            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <input
                required
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="e.g. rahul@example.com"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl text-xs focus:outline-none focus:border-[#C69E58]"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#687163] hover:text-[#1D241C] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;

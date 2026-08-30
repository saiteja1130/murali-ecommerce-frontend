import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  KeyRound,
  RotateCcw
} from 'lucide-react';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, verifyEmail, requestOtp } = useAuth();

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);

  // OTP Verification Stage
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // Countdown timer for OTP
  useEffect(() => {
    let timer;
    if (isOtpStage && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [isOtpStage, resendTimer]);

  // Step 1: Send OTP to verify email
  const handleInitiateSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessNotice('');

    if (!name.trim() || !email.trim() || !phone.trim() || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please check again.');
      return;
    }

    if (!acceptTerms) {
      setErrorMessage('Please accept the Terms & Conditions and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    try {
      await signup({ name, email, phone, password });
      setIsOtpStage(true);
      setResendTimer(60);
      setCanResend(false);
      setSuccessNotice(`A 6-digit verification code has been sent to ${email}`);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Signup failed. Please try again.');
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
      const nextInput = document.getElementById(`signup-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`signup-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setCanResend(false);
    setResendTimer(60);
    try {
      await requestOtp(email);
      setSuccessNotice(`A new 6-digit code was sent to ${email}`);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Failed to resend code');
    }
  };

  // Step 2: Verify OTP and finalize
  const handleVerifyOtpAndRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const fullEnteredOtp = otpCode.join('');

    if (fullEnteredOtp.length !== 6) {
      setErrorMessage('Please enter the full 6-digit OTP code.');
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail(email, fullEnteredOtp);
      const redirectUrl = sessionStorage.getItem('sumilux_redirect_after_login') || '/';
      sessionStorage.removeItem('sumilux_redirect_after_login');
      navigate(redirectUrl);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Invalid or expired OTP code.');
    } finally {
      setIsLoading(false);
    }
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
            JOIN MURARI'S GLAM & GLOW
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#1D241C] pt-1">
            {isOtpStage ? 'Verify Email Address' : 'Create Your Account'}
          </h1>
          <p className="text-xs text-[#687163] leading-relaxed">
            {isOtpStage
              ? `We have sent a 6-digit verification code to ${email}`
              : 'Register to save delivery addresses, track orders easily, and enjoy faster checkout.'}
          </p>
        </div>

        {/* Error Alert */}
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
                Verification Code: <strong>{generatedOtp}</strong>
              </div>
            )}
          </div>
        )}

        {/* STAGE 1: REGISTRATION FORM */}
        {!isOtpStage ? (
          <form onSubmit={handleInitiateSignup} className="space-y-4 text-xs">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-[#1D241C]"
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Phone Number */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] mb-1">
                10-Digit Mobile Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-[#1D241C] font-mono"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] mb-1">
                Password (Min. 6 Characters) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-[#1D241C]"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-[#687163] cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 rounded border-[#E8E4DC] text-[#506040] focus:ring-[#506040]"
                />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#1D241C] underline font-semibold hover:text-[#506040]">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" className="text-[#1D241C] underline font-semibold hover:text-[#506040]">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 mt-4"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* STAGE 2: OTP VERIFICATION FORM */
          <form onSubmit={handleVerifyOtpAndRegister} className="space-y-6 text-xs animate-fade-in">
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1D241C] text-center">
                Enter the 6-Digit Code
              </label>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`signup-otp-${index}`}
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

            {/* Resend & Change Email Row */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E8E4DC]">
              <button
                type="button"
                onClick={() => setIsOtpStage(false)}
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
                <span>{canResend ? 'Resend Code' : `Resend in ${resendTimer}s`}</span>
              </button>
            </div>

            {/* Verify CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Code...</span>
                </div>
              ) : (
                <>
                  <span>Verify & Complete Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Link to Login */}
        <div className="pt-4 border-t border-[#E8E4DC] text-center text-xs text-[#687163]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#1D241C] hover:text-[#506040] transition-colors underline ml-1">
            Log In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

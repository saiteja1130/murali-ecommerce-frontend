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
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters in length.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    if (!acceptTerms) {
      setErrorMessage('Please accept the Terms of Service & Privacy Policy.');
      return;
    }

    setIsLoading(true);
    try {
      await signup({ name, email, phone, password });
      setIsOtpStage(true);
      setResendTimer(60);
      setCanResend(false);
      setSuccessNotice(`A 6-digit verification code has been dispatched to ${email}`);
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

    // Auto-focus next input box
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
      setSuccessNotice(`New 6-digit verification code dispatched to ${email}`);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Failed to resend OTP');
    }
  };

  // Step 2: Verify OTP and complete registration
  const handleVerifyOtpAndRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const fullEnteredOtp = otpCode.join('');

    if (fullEnteredOtp.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail(email, fullEnteredOtp);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F6F3]">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[4px] border border-[#E8E3DE] shadow-xl animate-fade-in space-y-7 font-sans">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block group focus:outline-none">
            <span className="font-serif text-3xl font-bold tracking-[0.2em] text-[#1A1A1A] group-hover:text-[#C8A87C] transition-colors">
              SUMILUX
            </span>
          </Link>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#C8A87C] font-semibold">
            ATELIER PATRON MEMBERSHIP
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] pt-1">
            {isOtpStage ? 'Verify Email Address' : 'Create Patron Account'}
          </h1>
          <p className="text-xs text-[#6B6B6B] leading-relaxed">
            {isOtpStage
              ? `We have dispatched a 6-digit verification code to ${email}`
              : 'Register to access private capsule releases, express order tracking, and complimentary tailoring.'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xs animate-shake">
            {errorMessage}
          </div>
        )}

        {/* Success Notice / Demo OTP Helper */}
        {successNotice && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xs space-y-1">
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
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] text-[#1A1A1A]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eleanor.vance@sumilux.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] text-[#1A1A1A]"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (415) 890-2144"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] text-[#1A1A1A]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Password (Min. 6 Characters) *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] text-[#1A1A1A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#1A1A1A]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C] text-[#1A1A1A]"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-[#6B6B6B] cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 rounded border-[#E8E3DE] text-[#C8A87C] focus:ring-[#C8A87C]"
                />
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#1A1A1A] underline hover:text-[#C8A87C]">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" className="text-[#1A1A1A] underline hover:text-[#C8A87C]">
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
              className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-bold uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 mt-4"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Dispatching OTP...</span>
                </div>
              ) : (
                <>
                  <span>Verify Email & Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* STAGE 2: OTP VERIFICATION FORM */
          <form onSubmit={handleVerifyOtpAndRegister} className="space-y-6 text-xs animate-fade-in">
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] text-center">
                Enter 6-Digit Email OTP
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
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center font-mono text-lg font-bold bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] text-[#1A1A1A]"
                  />
                ))}
              </div>
            </div>

            {/* Resend & Change Email Row */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E8E3DE]">
              <button
                type="button"
                onClick={() => setIsOtpStage(false)}
                className="text-[#6B6B6B] hover:text-[#1A1A1A] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Email</span>
              </button>

              <button
                type="button"
                disabled={!canResend}
                onClick={handleResendOtp}
                className={`flex items-center gap-1 font-medium ${
                  canResend
                    ? 'text-[#C8A87C] hover:underline cursor-pointer'
                    : 'text-[#9E9B97] cursor-not-allowed'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>{canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}</span>
              </button>
            </div>

            {/* Verify CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-bold uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Validating OTP Code...</span>
                </div>
              ) : (
                <>
                  <span>Verify OTP & Complete Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Link to Login */}
        <div className="pt-4 border-t border-[#E8E3DE] text-center text-xs text-[#6B6B6B]">
          Already have an atelier account?{' '}
          <Link to="/login" className="font-bold text-[#1A1A1A] hover:text-[#C8A87C] transition-colors underline ml-1">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

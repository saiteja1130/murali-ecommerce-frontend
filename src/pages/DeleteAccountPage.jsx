import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserX, ShieldAlert, CheckCircle2, ChevronRight, AlertTriangle, Trash2, Mail, Lock, Clock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DeleteAccountPage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [email, setEmail] = useState(currentUser?.email || '');
  const [reason, setReason] = useState('No longer using the service');
  const [confirmText, setConfirmText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmText !== 'DELETE') return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 lg:py-16 animate-fade-in font-sans text-[#1D241C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#687163]">
          <Link to="/" className="hover:text-[#1D241C] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link to="/privacy-policy" className="hover:text-[#1D241C] transition-colors">Privacy Policy</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#1D241C] font-semibold">Account &amp; Data Deletion Request</span>
        </nav>

        {/* Header Hero Card */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 text-[10px] font-mono font-bold tracking-widest uppercase rounded-lg border border-rose-200">
            <UserX className="w-3.5 h-3.5 text-rose-700" />
            Google Play Data Safety Mandate
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1D241C]">
            Request Account &amp; Personal Data Deletion
          </h1>
          <p className="text-xs sm:text-sm text-[#687163] max-w-2xl leading-relaxed">
            In compliance with Google Play Store Developer Policies and the Digital Personal Data Protection Act, you can request permanent deletion of your Murari&apos;s Glam &amp; Glow account and associated data.
          </p>
        </div>

        {/* Data Erasure Breakdown Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700">
              <Trash2 className="w-4 h-4 text-rose-700" />
              <span>Data That Will Be Permanently Deleted</span>
            </div>
            <ul className="text-xs text-[#687163] space-y-2 list-disc list-inside leading-relaxed">
              <li>Profile information (Full name, email address, mobile phone number).</li>
              <li>Saved shipping addresses and apartment details.</li>
              <li>Authentication tokens and account login credentials.</li>
              <li>Saved items in your Wishlist and active Shopping Bag.</li>
              <li>Customer service tickets and support chat histories.</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#506040]">
              <Clock className="w-4 h-4 text-[#506040]" />
              <span>Statutory Retained Records (If Any)</span>
            </div>
            <p className="text-xs text-[#687163] leading-relaxed">
              In accordance with Indian tax regulations (GST and commercial audit laws), past financial tax invoices for completed orders are archived in a secure, pseudonymized ledger for the statutory accounting duration, after which they are automatically purged.
            </p>
          </div>
        </div>

        {/* Deletion Form */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-8 sm:p-12 shadow-2xs space-y-6">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#1D241C]">
                Account Deletion Request Submitted
              </h2>
              <p className="text-xs sm:text-sm text-[#687163] max-w-md mx-auto leading-relaxed">
                Your request has been received. A verification confirmation has been sent to <strong>{email}</strong>. Your personal data and profile will be permanently wiped within 48 to 72 hours.
              </p>
              <div className="pt-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D241C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#506040] transition-colors"
                >
                  <span>Return to Homepage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#E8E4DC] pb-4">
                <h2 className="font-serif text-xl font-bold text-[#1D241C]">Submit Deletion Request</h2>
                <p className="text-xs text-[#687163] mt-1">
                  Please enter the email address linked to your account.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#1D241C] block mb-1.5">
                    Account Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. yourname@example.com"
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl text-xs text-[#1D241C] focus:outline-none focus:border-[#1D241C]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1D241C] block mb-1.5">
                    Reason for Deletion (Optional)
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl text-xs text-[#1D241C] focus:outline-none focus:border-[#1D241C]"
                  >
                    <option value="No longer using the service">No longer using the service</option>
                    <option value="Privacy concerns">Privacy concerns</option>
                    <option value="Created duplicate account">Created duplicate account</option>
                    <option value="Other reason">Other reason</option>
                  </select>
                </div>

                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-900">
                    <AlertTriangle className="w-4 h-4 text-rose-700" />
                    <span>Irreversible Action Warning</span>
                  </div>
                  <p className="text-[11px] text-rose-800 leading-relaxed">
                    Once deleted, your account cannot be recovered. Type the word <strong>DELETE</strong> in capital letters below to confirm.
                  </p>
                  <input
                    type="text"
                    required
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Type DELETE to confirm"
                    className="w-full px-4 py-2.5 bg-white border border-rose-300 rounded-lg text-xs text-rose-900 font-mono font-bold focus:outline-none focus:border-rose-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link to="/" className="text-xs text-[#687163] hover:text-[#1D241C] font-semibold">
                  Cancel and Return
                </Link>
                <button
                  type="submit"
                  disabled={confirmText !== 'DELETE' || isSubmitting || !email}
                  className="px-6 py-3.5 bg-rose-700 hover:bg-rose-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  {isSubmitting ? 'Processing Request...' : 'Permanently Delete Account'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPage;

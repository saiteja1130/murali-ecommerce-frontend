import React, { useEffect } from 'react';
import { LogOut, X, AlertCircle } from 'lucide-react';

export const LogoutConfirmModal = ({ isOpen, onClose, onConfirm, userName }) => {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      {/* Dimmed Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div
        id="logout-confirm-dialog"
        className="relative bg-white w-full max-w-md rounded-xs shadow-2xl z-10 border border-[#E8E3DE] overflow-hidden animate-fade-in"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-[#1A1A1A] hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header Icon */}
          <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 mx-auto sm:mx-0">
            <LogOut className="w-5 h-5 ml-0.5" />
          </div>

          {/* Title & Body */}
          <div className="text-center sm:text-left">
            <h3
              id="logout-modal-title"
              className="text-lg sm:text-xl font-bold font-serif text-[#1A1A1A] tracking-tight"
            >
              Confirm Sign Out
            </h3>
            <p className="mt-2 text-sm text-[#6B6864] leading-relaxed">
              {userName ? (
                <span>
                  <strong className="text-[#1A1A1A] font-semibold">{userName}</strong>, are you sure you want to log out of your account?
                </span>
              ) : (
                'Are you sure you want to log out of your account?'
              )}
            </p>
            <p className="mt-1 text-xs text-[#8C827A]">
              You will need to sign in again to view your order history, saved addresses, and active carts.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#4A4744] bg-neutral-100 hover:bg-neutral-200 rounded-xs transition-colors cursor-pointer text-center"
            >
              Cancel
            </button>
            <button
              type="button"
              id="confirm-logout-btn"
              onClick={onConfirm}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Yes, Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;

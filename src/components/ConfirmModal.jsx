import React, { useEffect } from 'react';
import { AlertTriangle, AlertCircle, Sparkles, X, Loader2, LogOut } from 'lucide-react';

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger', // 'danger' | 'primary' | 'warning' | 'logout'
  isLoading = false
}) => {
  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const getVariantDetails = () => {
    switch (variant) {
      case 'primary':
        return {
          iconBg: 'bg-[#506040]/10 text-[#506040] border border-[#506040]/20',
          icon: <Sparkles className="w-5 h-5" />,
          confirmBtn: 'bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C]',
        };
      case 'logout':
        return {
          iconBg: 'bg-[#FAF8F5] text-[#1D241C] border border-[#E8E4DC]',
          icon: <LogOut className="w-5 h-5" />,
          confirmBtn: 'bg-[#1D241C] hover:bg-[#A5432F] text-white',
        };
      case 'warning':
        return {
          iconBg: 'bg-amber-50 text-amber-700 border border-amber-200',
          icon: <AlertCircle className="w-5 h-5" />,
          confirmBtn: 'bg-amber-600 hover:bg-amber-700 text-white',
        };
      case 'danger':
      default:
        return {
          iconBg: 'bg-rose-50 text-rose-700 border border-rose-200',
          icon: <AlertTriangle className="w-5 h-5" />,
          confirmBtn: 'bg-rose-700 hover:bg-rose-800 text-white',
        };
    }
  };

  const details = getVariantDetails();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) onClose();
      }}
    >
      <div
        className="bg-white max-w-sm w-full p-6 rounded-2xl border border-[#E8E4DC] shadow-2xl space-y-4 relative animate-in zoom-in-95 duration-200 text-[#1D241C]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${details.iconBg}`}>
            {details.icon}
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="p-1 rounded-lg text-neutral-400 hover:text-[#1D241C] hover:bg-[#FAF8F5] transition-colors disabled:opacity-40 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="font-serif text-lg font-bold text-[#1D241C] tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-[#687163] mt-2 leading-relaxed font-sans">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#F2EFE9]">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1D241C] bg-[#FAF8F5] hover:bg-[#E8E4DC] border border-[#E8E4DC] rounded-xl transition-colors disabled:opacity-40 cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-50 cursor-pointer ${details.confirmBtn}`}
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

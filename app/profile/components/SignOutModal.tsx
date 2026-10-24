import React from "react";
import { AlertTriangle, LogOut } from "lucide-react";

interface SignOutModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SignOutModal({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: SignOutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* ব্যাকড্রপ */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => !isLoading && onClose()}
      />

      {/* মোডাল বক্স */}
      <div className="relative w-full max-w-sm rounded-3xl border border-[#243982] bg-[#0e1838] p-6 shadow-2xl z-10 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.15)]">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="cabinet text-lg font-bold text-white">
              Sign Out Confirmation
            </h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to log out of your Grow Tech account?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-[#273e7d] bg-[#132247]/60 hover:bg-[#132247] text-slate-300 text-xs font-semibold transition-all cursor-pointer active:scale-95"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="w-full py-2.5 rounded-xl bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 border border-red-400/30 text-white text-xs font-bold shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Edit3, X, Check } from "lucide-react";

interface EditNameModalProps {
  isOpen: boolean;
  name: string;
  isLoading: boolean;
  onChangeName: (val: string) => void;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
}

export default function EditNameModal({
  isOpen,
  name,
  isLoading,
  onChangeName,
  onClose,
  onSave,
}: EditNameModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* ব্যাকড্রপ */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => !isLoading && onClose()}
      />

      {/* মোডাল বক্স */}
      <div className="relative w-full max-w-md rounded-3xl border border-[#243982] bg-[#0e1838] p-6 shadow-2xl z-10 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-cyan-400" />
            <h3 className="cabinet text-base font-bold text-white">
              Edit Profile Name
            </h3>
          </div>
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a1128] border border-[#1c2d66] text-white text-xs focus:outline-none focus:border-cyan-400 transition-all font-medium placeholder:text-slate-600"
            />
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
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { AlertCircle, Check, Lock, ExternalLink } from "lucide-react";

interface BookingInputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  placeholder?: string;
  prefix?: string;
  maxLength?: number;
  touched: boolean;
  error?: string;
  readOnly?: boolean;
  showProfileShortcut?: boolean; // 👈 নতুন অপশনাল প্রপ
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

export default function BookingInputField({
  label,
  type = "text",
  value,
  placeholder,
  prefix,
  maxLength,
  touched,
  error,
  readOnly = false,
  showProfileShortcut = false, // 👈 ডিফল্ট false
  onChange,
  onBlur,
}: BookingInputFieldProps) {
  const isInvalid = touched && error;
  const isValid = touched && !error && value.trim().length > 0;

  return (
    <div>
      {/* 🏷️ লেবেল ও লক আইকন */}
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5 select-none">
          <span>{label}</span>
          {readOnly && (
            <span
              title="Verified account field (cannot be edited here)"
              className="inline-flex items-center text-slate-500 hover:text-slate-400 transition-colors"
            >
              <Lock className="w-2.5 h-2.5" />
            </span>
          )}
        </label>

        {isInvalid && (
          <span className="text-[10px] text-rose-400 font-mono flex items-center gap-1 animate-in fade-in duration-200">
            <AlertCircle className="w-2.5 h-2.5" />
            {error}
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3.5 text-xs font-mono text-cyan-400 select-none">
            {prefix}
          </span>
        )}
        <input
          type={type}
          required
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full ${prefix ? "pl-12" : "pl-4"} pr-10 py-2.5 rounded-xl border text-xs focus:outline-none transition-all font-mono placeholder:text-slate-600 ${
            readOnly
              ? "bg-[#070c1e] text-slate-400 border-white/5 cursor-not-allowed select-none opacity-85"
              : isInvalid
                ? "bg-[#0a1128] text-white border-rose-500/60 focus:border-rose-400"
                : isValid
                  ? "bg-[#0a1128] text-white border-emerald-500/50 focus:border-emerald-400"
                  : "bg-[#0a1128] text-white border-[#1c2d66] focus:border-cyan-400"
          }`}
        />

        {isValid && (
          <span className="absolute right-3 pointer-events-none text-emerald-400 animate-in fade-in zoom-in-75 duration-200">
            <Check className="w-4 h-4" />
          </span>
        )}
      </div>

      {/* 🔗 প্রোফাইল এডিট শর্টকাট লিংক */}
      {readOnly && showProfileShortcut && (
        <div className="mt-1.5 flex justify-end">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400/80 hover:text-cyan-300 transition-colors group"
          >
            <span>Edit in Profile</span>
            <ExternalLink className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

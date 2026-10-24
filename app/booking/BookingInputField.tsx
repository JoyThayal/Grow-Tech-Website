import React from "react";
import { AlertCircle, Check } from "lucide-react";

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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
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
  onChange,
  onBlur,
}: BookingInputFieldProps) {
  const isInvalid = touched && error;
  const isValid = touched && !error && value.trim().length > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-mono uppercase text-slate-400">
          {label}
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
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full ${prefix ? "pl-12" : "pl-4"} pr-10 py-2.5 rounded-xl bg-[#0a1128] border text-white text-xs focus:outline-none transition-all font-mono placeholder:text-slate-600 ${
            isInvalid
              ? "border-rose-500/60 focus:border-rose-400"
              : isValid
                ? "border-emerald-500/50 focus:border-emerald-400"
                : "border-[#1c2d66] focus:border-cyan-400"
          }`}
        />

        {isValid && (
          <span className="absolute right-3 pointer-events-none text-emerald-400 animate-in fade-in zoom-in-75 duration-200">
            <Check className="w-4 h-4" />
          </span>
        )}
      </div>
    </div>
  );
}

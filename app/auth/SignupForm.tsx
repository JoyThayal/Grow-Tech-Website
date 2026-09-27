"use client";

import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) throw error;

      setSuccessMessage(
        "Account created! Please check your email to verify your account.",
      );
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs leading-tight">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs leading-tight">
          {successMessage}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
          Full name
        </label>
        <div className="relative">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Joy Thayal"
            className="w-full text-sm text-zinc-100 bg-zinc-950/60 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all placeholder:text-zinc-600"
          />
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
          Email address
        </label>
        <div className="relative">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@work-email.com"
            className="w-full text-sm text-zinc-100 bg-zinc-950/60 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all placeholder:text-zinc-600"
          />
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-300 mb-1.5">
          Create password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full text-sm text-zinc-100 bg-zinc-950/60 border border-zinc-800 rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all placeholder:text-zinc-600"
          />
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-medium text-sm transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-sm active:scale-[0.99]"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span>Create account</span>
            <ArrowRight className="w-4 h-4 stroke-2" />
          </>
        )}
      </button>
    </form>
  );
}

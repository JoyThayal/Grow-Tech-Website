"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // সফল হলে হোমপেজে বা ড্যাশবোর্ডে পাঠাবে
      window.location.href = "/";
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || "Failed to sign in");
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
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-medium text-zinc-300">Password</label>
          <button
            type="button"
            onClick={async () => {
              if (!email) {
                setErrorMessage(
                  "Please enter your email above to reset password",
                );
                return;
              }
              const { error } =
                await supabase.auth.resetPasswordForEmail(email);
              if (error) setErrorMessage(error.message);
              else alert("Password reset link has been sent to your email!");
            }}
            className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
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
            <span>Continue</span>
            <ArrowRight className="w-4 h-4 stroke-2" />
          </>
        )}
      </button>
    </form>
  );
}

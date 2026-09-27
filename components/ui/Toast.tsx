"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (title: string, description?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, description?: string, type: ToastType = "info") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type }]);

      // ৪ সেকেন্ড পর নিজে থেকেই স্মুথলি ভ্যানিশ হয়ে যাবে
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast],
  );

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-cyan-400 shrink-0" />;
    }
  };

  const getBorderGlow = (type: ToastType) => {
    switch (type) {
      case "success":
        return "border-emerald-500/30 shadow-[0_8px_30px_rgb(16,185,129,0.12)]";
      case "error":
        return "border-rose-500/30 shadow-[0_8px_30px_rgb(244,63,94,0.12)]";
      case "warning":
        return "border-amber-500/30 shadow-[0_8px_30px_rgb(245,158,11,0.12)]";
      default:
        return "border-cyan-500/30 shadow-[0_8px_30px_rgb(6,182,212,0.12)]";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* 🚀 ফিক্সড স্ক্রিন কনটেইনার */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 10,
                filter: "blur(4px)",
                transition: { duration: 0.2 },
              }}
              transition={{
                type: "spring",
                stiffness: 450,
                damping: 30,
              }}
              className={`pointer-events-auto relative overflow-hidden flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-[#090d16]/90 backdrop-blur-xl border ${getBorderGlow(
                toast.type,
              )} text-left`}
            >
              {/* ব্যাকগ্রাউন্ড হালকা আভা */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/2 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getIcon(toast.type)}</div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold text-zinc-100 tracking-tight">
                    {toast.title}
                  </h4>
                  {toast.description && (
                    <p className="text-[11px] text-zinc-400 leading-snug">
                      {toast.description}
                    </p>
                  )}
                </div>
              </div>

              {/* ক্লোজ বাটন */}
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

// 🪝 সহজে ব্যবহারের জন্য কাস্টম হুক
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

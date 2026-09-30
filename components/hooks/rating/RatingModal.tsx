"use client";

import React from "react";
import { X, Sparkles } from "lucide-react";
import { RatingSummary } from "./RatingSummary";
import { RatingForm } from "./RatingForm";
import { ReviewList } from "./ReviewList";

export interface RatingReview {
  id: string;
  userId?: string;
  userName: string;
  rating: number;
  comment?: string;
  date: string;
}

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  averageRating: number;
  totalReviews: number;
  reviews: RatingReview[];
  isLoggedIn?: boolean;
  currentUserId?: string;
  requireDownload?: boolean;
  hasDownloaded?: boolean;
  requireVisit?: boolean;
  hasVisited?: boolean;
  onDownloadClick?: () => void;
  onVisitClick?: () => void;
  onLoginClick?: () => void;
  onSubmitRating?: (rating: number, comment?: string) => void;
}

export default function RatingModal(props: RatingModalProps) {
  if (!props.isOpen) return null;

  // 🔍 চেক করা হচ্ছে বর্তমান ইউজার অলরেডি রিভিউ দিয়েছে কি না
  const hasUserRated = Boolean(
    props.currentUserId &&
    props.reviews.some((r) => r.userId === props.currentUserId),
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={props.onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#040814]/80 backdrop-blur-md transition-all duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#0a1128] border border-[#1c2d66] rounded-2xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-left overflow-hidden antialiased"
      >
        {/* 🌌 ব্যাকগ্রাউন্ড গ্লো */}
        <div className="absolute top-0 right-0 w-64 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ❌ ক্লোজ বাটন */}
        <button
          type="button"
          onClick={props.onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#121f48] border border-transparent hover:border-[#243982] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 🏷️ হেডার */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[11px] font-mono tracking-wide">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Reviews & Feedback</span>
          </div>
          <h3 className="text-xl font-semibold text-white mt-2 tracking-tight">
            {props.projectTitle}
          </h3>
        </div>

        {/* ১. রেটিং সামারি */}
        <RatingSummary
          averageRating={props.averageRating}
          totalReviews={props.totalReviews}
          reviews={props.reviews}
        />

        {/* ২. রেটিং ইনপুট ফর্ম (লক সিস্টেম সহ) */}
        <RatingForm
          isLoggedIn={props.isLoggedIn ?? false}
          hasRated={hasUserRated}
          requireDownload={props.requireDownload}
          hasDownloaded={props.hasDownloaded}
          requireVisit={props.requireVisit}
          hasVisited={props.hasVisited}
          onDownloadClick={props.onDownloadClick}
          onVisitClick={props.onVisitClick}
          onLoginClick={() => {
            props.onClose();
            props.onLoginClick?.();
          }}
          onSubmit={(rating, comment) => {
            props.onSubmitRating?.(rating, comment);
            props.onClose();
          }}
        />

        {/* ৩. শুধু পড়ার উপযোগী ক্লিন রিভিউ লিস্ট */}
        <ReviewList reviews={props.reviews} />
      </div>
    </div>
  );
}

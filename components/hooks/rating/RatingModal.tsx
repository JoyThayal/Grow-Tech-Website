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
  onDeleteReview?: (reviewId: string) => void;
}

export default function RatingModal(props: RatingModalProps) {
  if (!props.isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={props.onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 sm:p-7 shadow-2xl text-left overflow-hidden antialiased"
      >
        <button
          type="button"
          onClick={props.onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* হেডার */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-medium tracking-wide">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Reviews & Feedback</span>
          </div>
          <h3 className="text-xl font-semibold text-zinc-100 mt-2 tracking-tight">
            {props.projectTitle}
          </h3>
        </div>

        {/* ১. রেটিং সামারি */}
        <RatingSummary
          averageRating={props.averageRating}
          totalReviews={props.totalReviews}
          reviews={props.reviews}
        />

        {/* ২. রেটিং ইনপুট ফর্ম ও গেটিং */}
        <RatingForm
          isLoggedIn={props.isLoggedIn ?? false}
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

        {/* ৩. রিভিউ লিস্ট ও ডিলিট অ্যাকশন */}
        <ReviewList
          reviews={props.reviews}
          currentUserId={props.currentUserId}
          onDeleteReview={props.onDeleteReview}
        />
      </div>
    </div>
  );
}

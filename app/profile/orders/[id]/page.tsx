"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  FileText,
  Layers,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface BookingDetail {
  id: string;
  client_name: string;
  client_email?: string;
  client_phone: string;
  service_type: string;
  package_name: string;
  price: string;
  project_notes?: string;
  status: "pending" | "in_development" | "completed";
  created_at: string;
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderDetail() {
      if (!orderId) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push(`/auth?next=/profile/orders/${orderId}`);
        return;
      }

      const { data, error } = await supabase
        .from("client_bookings")
        .select("*")
        .eq("id", orderId)
        .eq("user_id", session.user.id)
        .single();

      if (error || !data) {
        console.error("Failed to load order detail:", error);
      } else {
        setOrder(data);
      }
      setLoading(false);
    }

    fetchOrderDetail();
  }, [orderId, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a1128] text-white flex items-center justify-center p-4">
        <div className="w-7 h-7 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-[#0a1128] text-white py-16 px-4 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-xl font-bold">Booking Not Found</h2>
          <p className="text-xs text-slate-400">
            We couldn&apos;t find this project order, or you do not have
            permission to view it.
          </p>
          <Link
            href="/profile/orders"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a1128] text-white py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 -z-10 h-80 w-full max-w-2xl rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back navigation */}
        <Link
          href="/profile/orders"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>

        {/* Top Summary Card */}
        <div className="rounded-3xl border border-[#1c2d66] bg-[#0e1838]/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                {order.service_type}
              </span>
              <h1 className="cabinet text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {order.package_name}
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Order ID: <span className="text-slate-300">{order.id}</span>
              </p>
            </div>

            <div className="sm:text-right">
              <span
                className={`inline-block text-[11px] font-mono px-3.5 py-1 rounded-full uppercase tracking-wider font-semibold border ${
                  order.status === "completed"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : order.status === "in_development"
                      ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                }`}
              >
                {order.status.replace("_", " ")}
              </span>
              <p className="text-xs font-mono text-cyan-300 font-bold mt-2">
                {order.price}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#0a1128] border border-[#1c2d66] space-y-1">
              <span className="text-slate-500 font-mono uppercase text-[10px] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Booking Date
              </span>
              <p className="font-semibold text-slate-200">
                {new Date(order.created_at).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0a1128] border border-[#1c2d66] space-y-1">
              <span className="text-slate-500 font-mono uppercase text-[10px] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" /> Contact Phone
              </span>`` 
              <p className="font-semibold text-slate-200 font-mono">
                {order.client_phone}
              </p>
            </div>

            {order.client_email && (
              <div className="p-4 rounded-2xl bg-[#0a1128] border border-[#1c2d66] space-y-1">
                <span className="text-slate-500 font-mono uppercase text-[10px] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email
                </span>
                <p className="font-semibold text-slate-200">
                  {order.client_email}
                </p>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-[#0a1128] border border-[#1c2d66] space-y-1">
              <span className="text-slate-500 font-mono uppercase text-[10px] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" /> Development
                Phase
              </span>
              <p className="font-semibold text-slate-200 capitalize">
                {order.status === "pending"
                  ? "Requirement Review"
                  : order.status === "in_development"
                    ? "Active UI/Code Building"
                    : "Deployed & Handed Over"}
              </p>
            </div>
          </div>

          {/* Project Requirements/Notes */}
          {order.project_notes && (
            <div className="p-4 rounded-2xl bg-[#0a1128] border border-[#1c2d66] space-y-2">
              <span className="text-slate-400 font-mono uppercase text-[10px] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" /> Client Notes
                & Requirements
              </span>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                {order.project_notes}
              </p>
            </div>
          )}

          {/* Guarantee badge & Direct WhatsApp Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Full Source Code & Deployment Support</span>
            </div>

            <a
              href={`https://wa.me/+918902709631?text=Hi%20Grow%20Tech,%20I%20have%20an%20inquiry%20regarding%20my%20Order%20ID:%20${order.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

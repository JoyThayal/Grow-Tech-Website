"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  ArrowLeft,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface OrderItem {
  id: string;
  package_name: string;
  price: string;
  status: "pending" | "in_development" | "completed";
  created_at: string;
}

export default function UserOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadOrders() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          router.push("/auth?next=/profile/orders");
          return;
        }

        const { data, error } = await supabase
          .from("client_bookings")
          .select("id, package_name, price, status, created_at")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.warn("Bookings fetch notice:", error.message);
        }

        if (isMounted && data) {
          setOrders(data);
        }
      } catch (err) {
        console.error("Order load error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a1128] text-slate-100 flex items-center justify-center p-4">
        <div className="w-6 h-6 border-2 border-[#00e5ff] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a1128] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ব্যাক বাটন ও হেডার */}
        <div className="flex items-center justify-between">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile</span>
          </Link>

          <span className="text-[11px] font-mono tracking-wider px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 font-bold uppercase">
            ORDER HISTORY
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="cabinet text-2xl sm:text-3xl font-extrabold text-white">
            Your Booked Packages & Services
          </h1>
          <p className="garet text-xs sm:text-sm text-slate-400">
            Click on any project to view complete milestone tracking and
            details.
          </p>
        </div>

        {/* বুকিং হিস্ট্রি লিস্ট বা ফাঁকা স্টেট */}
        <div className="rounded-3xl border border-[#1c2d66] bg-[#0e1838]/70 backdrop-blur-xl p-5 sm:p-8">
          {orders.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-200">
                  No active orders found
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  You haven&apos;t booked any web packages yet. Check out our
                  services to launch your digital project.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/services"
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                >
                  Browse Packages
                </Link>

                <a
                  href="https://wa.me/+918902709631?text=Hi%20Grow%20Tech,%20I%20have%20an%20inquiry%20regarding%20my%20booking."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl border border-[#1c2d66] bg-[#132247]/60 text-slate-300 hover:text-white font-semibold text-xs transition-all inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Contact Support</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/profile/orders/${order.id}`}
                  className="group p-4 sm:p-5 rounded-2xl bg-[#0a1128]/80 border border-[#1c2d66] hover:border-cyan-400/50 hover:bg-[#0d163a] transition-all flex items-center justify-between gap-4 cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {order.package_name}
                      </h4>
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        {order.price}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono">
                      Booked on{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] sm:text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-semibold border ${
                        order.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : order.status === "in_development"
                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                    <div className="p-1.5 rounded-lg bg-white/5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

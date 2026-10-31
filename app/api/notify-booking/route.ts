import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const groupChatId = process.env.TELEGRAM_GROUP_CHAT_ID;
    const adminEmail =
      process.env.ADMIN_NOTIFICATION_EMAIL || "growtechofficials4@gmail.com";

    // 📩 ১. সুন্দর ইমেইল টেমপ্লেট
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #0b1120; color: #ffffff; padding: 24px; border-radius: 12px; max-width: 600px; margin: auto;">
        <h2 style="color: #38bdf8; margin-top: 0;">🚀 New Client Booking Alert!</h2>
        <p style="color: #94a3b8; font-size: 14px;">Someone just submitted a project request on Grow Tech website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; background: #1e293b; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 10px 14px; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #334155;">Client Name</td>
            <td style="padding: 10px 14px; color: #ffffff; font-weight: bold; font-size: 13px; border-bottom: 1px solid #334155;">${data.name || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #334155;">WhatsApp Phone</td>
            <td style="padding: 10px 14px; color: #38bdf8; font-weight: bold; font-size: 13px; border-bottom: 1px solid #334155;">${data.phone || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #334155;">Email</td>
            <td style="padding: 10px 14px; color: #ffffff; font-size: 13px; border-bottom: 1px solid #334155;">${data.email || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #334155;">Requested Service</td>
            <td style="padding: 10px 14px; color: #a855f7; font-weight: bold; font-size: 13px; border-bottom: 1px solid #334155;">${data.service ? String(data.service).toUpperCase() : "GENERAL"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #334155;">Selected Package</td>
            <td style="padding: 10px 14px; color: #ffffff; font-size: 13px; border-bottom: 1px solid #334155;">${data.packageName || "Custom"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; color: #94a3b8; font-size: 13px;">Budget / Price</td>
            <td style="padding: 10px 14px; color: #4ade80; font-weight: bold; font-size: 13px;">${data.price || "Discussion"}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding: 12px; background: rgba(56, 189, 248, 0.1); border-left: 4px solid #38bdf8; font-size: 12px; color: #cbd5e1;">
          ⚡ <strong>Grow Tech Team:</strong> Check Supabase records and contact the client promptly.
        </div>
      </div>
    `;

    // 🤖 ২. টেলিগ্রাম মেসেজ টেমপ্লেট (HTML Mode)
    const telegramText = `
🚨 <b>NEW CLIENT BOOKING ALERT!</b> 🚨
━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Client Name:</b> ${data.name || "N/A"}
📞 <b>Phone:</b> ${data.phone || "N/A"}
📧 <b>Email:</b> ${data.email || "N/A"}
🛠 <b>Service:</b> ${data.service ? String(data.service).toUpperCase() : "GENERAL"}
📦 <b>Package:</b> ${data.packageName || "Custom"}
💰 <b>Price/Budget:</b> ${data.price || "Discussion"}
━━━━━━━━━━━━━━━━━━━━━━
⚡ <b>Grow Tech Team, check Supabase & contact client ASAP!</b>
    `;

    // 🚀 ৩. দুটি নোটিফিকেশন একসাথে রান করার টাস্ক
    const tasks: Promise<unknown>[] = [];

    // টাস্ক ১: ইমেইল পাঠানো
    if (process.env.RESEND_API_KEY) {
      tasks.push(
        resend.emails.send({
          from: "Grow Tech <onboarding@resend.dev>",
          to: [adminEmail],
          subject: `🚨 New Booking: ${data.name || "Client"} (${data.service || "Project"})`,
          html: emailHtml,
        }),
      );
    }

    // টাস্ক ২: টেলিগ্রামে মেসেজ পাঠানো
    if (botToken && groupChatId) {
      tasks.push(
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: groupChatId,
            text: telegramText,
            parse_mode: "HTML",
          }),
        }),
      );
    }

    // দুটি কাজই ব্যাকগ্রাউন্ডে সমান্তরালে এক্সিকিউট হবে
    const results = await Promise.allSettled(tasks);

    results.forEach((res, idx) => {
      if (res.status === "rejected") {
        console.error(`Alert service ${idx} failed:`, res.reason);
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking Notification System Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

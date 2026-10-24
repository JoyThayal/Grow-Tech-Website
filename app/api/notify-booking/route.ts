import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const groupChatId = process.env.TELEGRAM_GROUP_CHAT_ID;

    if (!botToken || !groupChatId) {
      console.error("Telegram credentials missing in .env.local");
      return NextResponse.json({ error: "Missing config" }, { status: 500 });
    }

    // 🚀 টেলিগ্রাম গ্রুপে সুন্দর ফরম্যাটে পাঠানো মেসেজ
    const text = `
🚨 *NEW CLIENT BOOKING ALERT!* 🚨
━━━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${data.name || "N/A"}
📞 *Phone:* ${data.phone || "N/A"}
📧 *Email:* ${data.email || "N/A"}
🛠 *Service:* ${data.service ? data.service.toUpperCase() : "GENERAL"}
📦 *Package:* ${data.packageName || "Custom"}
💰 *Price/Budget:* ${data.price || "Discussion"}
━━━━━━━━━━━━━━━━━━━━━━
⚡ *Grow Tech Team, check Supabase & contact client ASAP!*
    `;

    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: groupChatId,
          text: text,
          parse_mode: "Markdown",
        }),
      },
    );

    if (!res.ok) {
      const errData = await res.json();
      console.error("Telegram API Error:", errData);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking Alert Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code, buyer, date } = await req.json();
    const webhookUrl = process.env.DISCORD_CERTIFICATE_WEBHOOK || "https://discord.com/api/webhooks/1394098650568986714/9T9ZYxh77wQggIl0rDH0ipZkzS1mJNKGmS9m3qTUqMYfkaly9bFXmysxyaAGIpmaTRDa";
    const content = `🎟️ **Certificate Issued**\nName: ${buyer}\nDate: ${date}\nAuthenticity Code: \`${code}\``;
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
    if (!res.ok) {
      return new Response("Failed to send to Discord", { status: 500 });
    }
    return new Response("OK", { status: 200 });
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
} 
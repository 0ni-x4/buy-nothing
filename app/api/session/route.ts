import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");
  if (!session_id) {
    return NextResponse.json({ name: "Anonymous" }, { status: 400 });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const customName = session.custom_fields?.find((f: { key: string; text?: { value?: string } }) => f.key === "certificate_name")?.text?.value;
    const name = customName || session.customer_details?.name || "Anonymous";
    return NextResponse.json({ name });
  } catch (err) {
    return NextResponse.json({ name: "Anonymous" }, { status: 500 });
  }
} 
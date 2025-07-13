import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const origin = req.headers.get("origin") || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product: "prod_Rz8EXdgs7zoKD3",
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      custom_fields: [
        {
          key: "certificate_name",
          label: { type: "custom", custom: "Name for Certificate" },
          type: "text",
          optional: false,
        },
      ],
      success_url: `${origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: "Unable to create session." }, { status: 500 });
  }
} 
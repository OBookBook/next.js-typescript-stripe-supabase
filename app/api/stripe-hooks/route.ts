import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
  const signature = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_SIGNING_SECRET!;

  const reqBuffer = Buffer.from(await req.arrayBuffer());

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature!,
      endpointSecret
    );

    // console.log(event);
    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json(`Webhook Error: ${error.message}`, {
      status: 401,
    });
  }
}

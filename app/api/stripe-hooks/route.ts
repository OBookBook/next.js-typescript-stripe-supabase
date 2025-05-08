import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Stripe webhook received");

  return NextResponse.json({ received: true });
}

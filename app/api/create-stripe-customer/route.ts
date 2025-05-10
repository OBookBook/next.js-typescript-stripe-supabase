import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import initStripe from "stripe";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const query = req.nextUrl.searchParams.get("API_ROUTE_SECRET");
  if (query !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json(
      {
        message: "Invalid API route secret",
      },
      { status: 401 }
    );
  }

  const data = await req.json();
  const { id, email } = data.record;

  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
  const customer = await stripe.customers.create({
    email,
  });

  await supabase
    .from("profile")
    .update({
      stripe_customer: customer.id,
    })
    .eq("id", id);

  return NextResponse.json({
    message: `Stripe customer created: ${customer.id}`,
  });
}

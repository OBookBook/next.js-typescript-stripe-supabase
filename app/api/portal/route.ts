import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import initStripe from "stripe";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) return NextResponse.json("Unauthorized", { status: 401 });

  const { data: stripe_customer_data } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user?.id)
    .single();

  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.billingPortal.sessions
    .create({
      customer: stripe_customer_data?.stripe_customer,
      return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    })
    .catch((error) => {
      console.error("🚀Stripe session creation error:", error);
      return NextResponse.json("Error creating session", { status: 500 });
    });

  return NextResponse.json({ url: session.url });
}

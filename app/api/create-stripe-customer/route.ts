import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import initStripe from "stripe";
import { cookies } from "next/headers";
/**
 *
 * @POST: http://localhost:3000/api/create-stripe-customer
 * @body: {
 *  "id": "5623bb48-765c-4cfd-9b60-bf32a706aade", ※ profile.idを指定すること
 *  "email": "naobe@gmail.com"
}
 */
export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const data = await req.json();
  const { id, email } = data;

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

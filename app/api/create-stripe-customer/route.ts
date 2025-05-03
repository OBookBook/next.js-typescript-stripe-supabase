import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";

/**
 *
 * @POST: http://localhost:3000/api/create-stripe-customer
 * @body: {
 *  "email": "test@gmail.com"
 * }
 */
export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email } = data;

  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
  const customer = await stripe.customers.create({
    email,
  });

  return NextResponse.json({
    message: `Stripe customer created: ${customer.id}`,
  });
}

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { Database } from "@/lib/database.types";

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
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

    console.log(event);

    switch (event.type) {
      case "customer.subscription.created":
        const customerSubscriptionCreated = event.data.object;
        await supabase
          .from("profile")
          .update({
            is_subscribed: true,
            interval: customerSubscriptionCreated.items.data[0].plan.interval,
          })
          .eq("stripe_customer", event.data.object.customer as string);
        break;
      case "customer.subscription.updated":
        const customerSubscriptionUpdated = event.data.object;
        if (
          customerSubscriptionUpdated.status === "canceled" ||
          customerSubscriptionUpdated.cancel_at_period_end === true
        ) {
          await supabase
            .from("profile")
            .update({
              is_subscribed: false,
              interval: "null",
            })
            .eq("stripe_customer", event.data.object.customer as string);
          break;
        } else {
          await supabase
            .from("profile")
            .update({
              is_subscribed: true,
              interval: customerSubscriptionUpdated.items.data[0].plan.interval,
            })
            .eq("stripe_customer", event.data.object.customer as string);
          break;
        }
      case "customer.subscription.deleted":
        await supabase
          .from("profile")
          .update({
            is_subscribed: false,
            interval: "null",
          })
          .eq("stripe_customer", event.data.object.customer as string);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(`Webhook Error: ${errorMessage}`, {
      status: 401,
    });
  }
}

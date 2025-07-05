import { NextResponse } from "next/server";
import stripe from "@/lib/ServeStripe";

export async function POST(request) {
  try {
    const body = await request.json();

    const subscription = await stripe.subscriptions.create({
      customer: body.customerId,
      items: [
        {
          price: body.priceId,
        },
      ],
      default_payment_method: body.paymentMethodId,
      expand: ["latest_invoice.payment_intent"],
    });

    return NextResponse.json(
      {
        success: true,
        subscription,
        message: "Subscription has been created!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Stripe error: ", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

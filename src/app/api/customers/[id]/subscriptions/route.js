import { NextResponse } from "next/server";
import stripe from "@/lib/ServeStripe";

export async function GET(_, { params }) {
  try {
    const { id } = await params;

    const subscriptions = await stripe.subscriptions.list({
      customer: id,
      status: "active",
    });

    return NextResponse.json(
      { success: true, subscriptions: subscriptions.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Stripe error: ", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import stripe from "@/lib/ServeStripe";

export async function GET(id) {
  try {
    const customer = await stripe.customers.retrieve(id.id);
    return NextResponse.json(
      { success: true, customer: customer },
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

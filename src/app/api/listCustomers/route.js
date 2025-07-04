import { NextResponse } from "next/server";
import stripe from "@/lib/ServeStripe";

export async function GET() {
  try {
    const customers = await stripe.customers.list({ limit: 100 });
    return NextResponse.json({ customers });
  } catch (error) {
    console.error("Stripe error: ", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

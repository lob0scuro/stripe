import { NextResponse } from "next/server";
import stripe from "@/lib/ServeStripe";

export async function GET() {
  try {
    const products = await stripe.products.list({ limit: 100 });
    return NextResponse.json({ succuss: true, products }, { status: 200 });
  } catch (error) {
    console.error("Stripe error: ", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

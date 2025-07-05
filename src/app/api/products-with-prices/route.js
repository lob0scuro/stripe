import { NextResponse } from "next/server";
import stripe from "@/lib/ServeStripe";

export async function GET() {
  try {
    const products = await stripe.products.list({ limit: 100 });

    const results = await Promise.all(
      products.data.map(async (product) => {
        const prices = await stripe.prices.list({
          product: product.id,
        });
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          prices: prices.data,
        };
      })
    );

    return NextResponse.json(
      { success: true, products: results },
      { status: 200 }
    );
  } catch (error) {
    console.error("Stripe error: ", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

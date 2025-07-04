import { NextResponse } from "next/server";
import stripe from "@/lib/ServeStripe";

export async function DELETE(id) {
  try {
    const del = await stripe.customers.del(id);
    return NextResponse.json(
      { success: true, message: "Customer has been deleted" },
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

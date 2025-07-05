import { NextResponse } from "next/server";
import stripe from "@/lib/ServeStripe";

//GET -> fetch a single customer
export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const customer = await stripe.customers.retrieve(id);
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

//DELETE -> delete a customer
export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    await stripe.customers.del(id);
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

//PUT -> update a customer
export async function PUT(request, { params }) {
  const { id } = await params;
  const updates = await request.json();
  try {
    const updatedCustomer = await stripe.customers.update(id, updates);
    return NextResponse.json(
      {
        success: true,
        message: "Successfully updated customer",
        customer: updatedCustomer,
      },
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

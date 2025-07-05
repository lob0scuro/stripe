import { NextResponse } from "next/server";
import stripe from "@/lib/ServeStripe";
import { capitalize } from "@/lib/Utils";

//GET -> list all customer
export async function GET() {
  try {
    const customers = await stripe.customers.list({ limit: 100 });
    return NextResponse.json({ success: true, customers }, { status: 200 });
  } catch (error) {
    console.error("Stripe error: ", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

//POST -> create new customer
export async function POST(request) {
  try {
    const body = await request.json();
    const customer = await stripe.customers.create({
      email: body.email,
      name: `${capitalize(body.first_name)} ${capitalize(body.last_name)}`,
      phone: body.phone,
      address: {
        line1: body.address,
        city: body.city,
        state: body.state,
        postal_code: body.zip,
        country: body.country,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Customer created successfully!",
        customer: customer,
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

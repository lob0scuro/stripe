import stripe from "@/lib/ServeStripe";

export async function POST(request) {
  try {
    const body = await request.json();
    const customer = await stripe.customers.create({
      email: body.email,
      name: `${body.first_name} ${body.last_name}`,
      phone: body.phone,
      address: {
        line1: body.address,
        city: body.city,
        state: body.state,
        postal_code: body.zip,
        country: body.country,
      },
    });
    return Response.json({ success: true, customer }, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

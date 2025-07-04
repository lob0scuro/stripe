import React from "react";
import stripe from "@/lib/ServeStripe";

const CustomerPage = async ({ params }) => {
  const { id } = params;
  const customer = await stripe.customers.retrieve(id);
  return (
    <>
      <h1>Hello {id}</h1>
      <p>{customer.name}</p>
    </>
  );
};

export default CustomerPage;

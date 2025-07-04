import styles from "./CustomerPage.module.css";
import React from "react";
import stripe from "@/lib/ServeStripe";
import Button from "@/components/Button";

// customer field //
// name, ...address, delinquent, email, phone,

const CustomerPage = async ({ params }) => {
  const { id } = params;
  const customer = await stripe.customers.retrieve(id);
  return (
    <>
      <div className={styles.customerInfoBlock}>
        <h1>{customer.name}</h1>
        <p>{customer.email}</p>
        <p>{customer.phone}</p>
        <ul>
          <li>{customer.address.line1}</li>
          <li>{customer?.address.line2}</li>
          <li>
            {customer.address.city}, {customer.address.state},{" "}
            {customer.address.postal_code}
          </li>
          <li>{customer.address.country}</li>
        </ul>
      </div>
      <Button title="Start Subscription" />
    </>
  );
};

export default CustomerPage;

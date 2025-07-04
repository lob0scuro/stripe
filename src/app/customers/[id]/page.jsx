"use client";

import styles from "./CustomerPage.module.css";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";

// customer field //
// name, ...address, delinquent, email, phone,

const CustomerPage = ({ params }) => {
  const { id } = React.use(params);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const get = async () => {
      const res = await fetch(`/api/getCustomer/${id}`);
      const data = await res.json();
      console.log(data);
      setCustomer(data.customer);
    };
    get();
  }, []);

  return (
    <>
      <div className={styles.customerInfoBlock}>
        <h1>{customer.name}</h1>
        <p>{customer.email}</p>
        <p>{customer.phone}</p>
        {customer.address && (
          <ul>
            <li>{customer.address.line1}</li>
            <li>{customer.address.line2}</li>
            <li>
              {customer.address.city}, {customer.address.state},{" "}
              {customer.address.postal_code}
            </li>
            <li>{customer.address.country}</li>
          </ul>
        )}
      </div>
      <div className="btnBlock">
        <Button title="Start Subscription" />
        <Button title="Delete Customer" className={styles.delButton} />
      </div>
    </>
  );
};

export default CustomerPage;

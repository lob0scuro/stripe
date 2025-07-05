"use client";

import styles from "./CustomerPage.module.css";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

// customer field //
// name, ...address, delinquent, email, phone,

const CustomerPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (!id) return;
    const get = async () => {
      const res = await fetch(`/api/customers/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      setCustomer(data.customer);
    };
    get();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Delete customer?")) return;
    const response = await fetch(`/api/customers/${id}`, {
      method: "DELETE",
    });

    const deleted = await response.json();
    if (!deleted.success) {
      toast.error(deleted.error);
      return;
    }
    toast.success(deleted.message);
    router.push("/customers");
  };

  if (!customer) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={styles.customerInfoBlock}>
        <h1>{customer.name}</h1>
        <div className={styles.contactInfo}>
          <p>
            <small>email:</small>
            {customer.email}
          </p>
          <p>
            <small>tel:</small>
            {customer.phone}
          </p>
        </div>
        {customer.address && (
          <ul>
            <small>address:</small>
            <li>{customer.address.line1}</li>
            {customer.address.line2 && <li>{customer.address.line2}</li>}
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
        <Button
          title="Delete Customer"
          className={styles.delButton}
          onClick={handleDelete}
        />
      </div>
    </>
  );
};

export default CustomerPage;

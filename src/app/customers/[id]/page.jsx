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
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    if (!id) return;
    const fetchCustomerData = async () => {
      try {
        const [customerRes, subsRes] = await Promise.all([
          fetch(`/api/customers/${id}`),
          fetch(`/api/customers/${id}/subscriptions`),
        ]);

        const customerData = await customerRes.json();
        const subsData = await subsRes.json();

        if (!customerRes.ok) {
          throw new Error(customerRes.error);
        }
        if (!subsRes.ok) {
          throw new Error(subsRes.error);
        }
        console.log(subsData);
        setCustomer(customerData.customer);
        setSubscriptions(subsData.subscriptions);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchCustomerData();
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
        <h1 className={customer.delinquent ? styles.delinquent : ""}>
          {customer.name} {customer.delinquent && <small>(Delinquent)</small>}
        </h1>
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
        {subscriptions.length === 0 && (
          <Button
            title="Start Subscription"
            onClick={() => router.push(`/customers/${id}/start-subscription`)}
          />
        )}

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

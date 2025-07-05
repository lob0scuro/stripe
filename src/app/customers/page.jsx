"use client";

import styles from "./Customers.module.css";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Customers = () => {
  const router = useRouter();
  const handleNavigation = (path) => {
    router.push(path);
  };
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const get = async () => {
      const res = await fetch("/api/customers", {
        method: "GET",
      });
      const data = await res.json();
      setCustomers(data.customers.data);
    };
    get();
  }, []);
  return (
    <>
      <table className={styles.customersTable}>
        <caption>Customers</caption>
        <colgroup>
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map(({ id, name, email, delinquent }) => (
            <tr
              className={delinquent ? styles.delinquent : ""}
              key={id}
              onClick={() => handleNavigation(`/customers/${id}`)}
            >
              <td>{name}</td>
              <td>{email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        title="Add Customer"
        onClick={() => handleNavigation("/customers/add-customer")}
      />
    </>
  );
};

export default Customers;

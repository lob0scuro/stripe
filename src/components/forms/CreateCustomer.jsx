"use client";

import styles from "./CreateCustomer.module.css";
import React, { useState } from "react";
import Button from "../Button";
import { countries } from "@/lib/Utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/createCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create customer");
      }

      const data = await response.json();
      setCustomer(data.customer);
      setFormData({
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      });
      toast.success("Customer created successfully!");
      router.push(`/customers/${data.customer.id}`);
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className={styles.createCustomerHeader}>Add Customer</h2>
      <p>* required field</p>
      <form onSubmit={handleSubmit} className={styles.createCustomerForm}>
        <div>
          <label htmlFor="email">*Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="first_name">*First Name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">*Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">*Phone Number</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.addressSection}>
          <label htmlFor="address">Billing Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            id="state"
            placeholder="State/Province"
            value={formData.state}
            onChange={handleChange}
          />
          <input
            type="text"
            name="zip"
            id="zip"
            placeholder="Zip/Postal Code"
            value={formData.zip}
            onChange={handleChange}
          />
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <Button title="Submit" type="submit" secondary />
      </form>
    </>
  );
};

export default CreateCustomer;
// This component is used to create a new customer in the Stripe dashboard.

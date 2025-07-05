"use client";

import styles from "./CreateCustomer.module.css";
import React, { useState } from "react";
import Button from "../Button";
import { countries } from "@/lib/Utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CARD_OPTIONS = {
  style: {
    base: {
      color: "#f9f9f9",
      fontSize: "18px",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#f9f9f9",
      },
    },
    invalid: {
      color: "f6a4ec",
      iconColor: "#f6a4ec",
    },
  },
  hidePostalCode: true,
};

const CreateCustomer = () => {
  const [testMode, setTestMode] = useState(false);
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
    card_choice: "default",
    testMode,
  });

  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
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

    let payment_method_id = null;

    try {
      if (!testMode) {
        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });
        if (error) throw new Error(error.message);
        payment_method_id = paymentMethod.id;
      }

      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ...(testMode
            ? { card_choice: formData.card_choice }
            : { payment_method_id }),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create customer");
      }

      const data = await response.json();
      toast.success("Customer created successfully!");
      router.push(`/customers/${data.customer.id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className={styles.createCustomerHeader}>Add Customer</h2>
      <p>* required field</p>
      <form onSubmit={handleSubmit} className={styles.createCustomerForm}>
        <div className={styles.contactInfoSection}>
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
        </div>
        <div className={styles.locationInfoSection}>
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
        </div>
        <div className={styles.paymentInfoSection}>
          {testMode ? (
            <div>
              <label htmlFor="card_choice">Payment Method (Test Mode)</label>
              <select name="card_choice" id="card_choice">
                <option value="">Choose Payment Method</option>
                <option value="default">VISA - 4242 4242 4242 4242</option>
                <option value="fail">Decline - 4000 0000 0000 9995</option>
                <option value="insufficient_funds">
                  Insufficient Funds - 4000 0000 0000 9995
                </option>
              </select>
            </div>
          ) : (
            <div className={styles.paymentCardElement}>
              <label htmlFor="card_choice">Payment Method</label>
              <CardElement options={CARD_OPTIONS} />
            </div>
          )}
        </div>

        <Button title="Submit" type="submit" secondary />
      </form>
    </>
  );
};

export default CreateCustomer;
// This component is used to create a new customer in the Stripe dashboard.

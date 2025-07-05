"use client";

import styles from "./StartSubscription.module.css";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import toast from "react-hot-toast";

const StartSubscription = () => {
  const { id } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [selectedPriceId, setSelectedPriceId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products-with-prices");
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setProducts(data.products);
      }
    };
    fetchProducts();
  }, []);

  const handleStartSubscription = async () => {
    if (!selectedPriceId) return;

    const res = await fetch("/api/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: id,
        priceId: selectedPriceId,
      }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      router.push(`/customers/${id}`);
    } else {
      toast.error(data.error);
    }
  };

  return (
    <>
      <div className={styles.subBlockMaster}>
        <h1 className={styles.startSubHeader}>Subscriptions</h1>
        {products
          .map((product) => (
            <div
              className={styles.subBlock}
              key={product.id}
              style={{ marginBottom: "2rem" }}
            >
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              {product.prices
                .map((price) => (
                  <div className={styles.subPrices} key={price.id}>
                    <label>
                      <input
                        type="radio"
                        name="price"
                        value={price.id}
                        checked={selectedPriceId === price.id}
                        onChange={() => setSelectedPriceId(price.id)}
                      />
                      <span>
                        {(price.unit_amount / 100).toFixed(2)}{" "}
                        {price.currency.toUpperCase()} /{" "}
                        {price.recurring?.interval}
                      </span>
                    </label>
                  </div>
                ))
                .reverse()}
            </div>
          ))
          .reverse()}

        <Button title="Start Subscription" onClick={handleStartSubscription} />
      </div>
    </>
  );
};

export default StartSubscription;

"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const Products = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const get = async () => {
      const res = await fetch("/api/listProducts");
      const data = await res.json();
      setProducts(data.products.data);
    };
    get();
  }, []);
  return (
    <>
      <h1>Products</h1>
      {products?.map(({ id, name, description }) => (
        <p key={id}>
          {name} - {description}
        </p>
      ))}
    </>
  );
};

export default Products;

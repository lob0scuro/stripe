"use client";

import Button from "@/components/Button";
import CreateCustomer from "@/components/forms/CreateCustomer";
import React from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };
  return (
    <>
      <div className="btnBlock">
        <Button
          title="Customers"
          onClick={() => handleNavigation("/customers")}
        />
        <Button
          title="Products"
          onClick={() => handleNavigation("/products")}
        />
        <Button title="Subscriptions" />
      </div>
    </>
  );
};

export default Home;

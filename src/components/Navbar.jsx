"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const handleNavigation = (path) => {
    router.push(path);
  };
  return (
    <header>
      <h1 onClick={() => handleNavigation("/")}>Matt's Appliances</h1>
    </header>
  );
};

export default Navbar;

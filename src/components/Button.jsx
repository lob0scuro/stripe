import styles from "./Button.module.css";
import React from "react";
import clsx from "clsx";

const Button = ({ title, type = "button", secondary, ...props }) => {
  return (
    <button
      type={type}
      className={clsx(styles.btn, secondary ? styles.secondaryBtn : "")}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;

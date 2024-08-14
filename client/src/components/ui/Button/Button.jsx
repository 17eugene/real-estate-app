import React from "react";
import Loader from "../Loader/Loader";
import styles from "./Button.module.scss";

const Button = ({ type, text, disabled, loading, onClick }) => {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loader width="40px" height="25px" radius="10" />
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;

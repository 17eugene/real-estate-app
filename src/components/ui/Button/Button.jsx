import React from "react";
import Loader from "../Loader/Loader";

const Button = ({ type, text, disabled, loading, onClick }) => {
  return (
    <button disabled={disabled} type={type} onClick={onClick}>
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

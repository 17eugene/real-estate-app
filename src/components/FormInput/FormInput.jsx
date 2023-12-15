import React from "react";

const FormInput = ({ type, placeholder, onChange, labelText, id, name }) => {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
      />
    </>
  );
};

export default FormInput;

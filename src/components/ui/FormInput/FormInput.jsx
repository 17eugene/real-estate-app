import React from "react";

const FormInput = ({
  type,
  placeholder,
  onChange,
  labelText,
  id,
  name,
  value,
  disabled,
  readOnly
}) => {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
      <input
        readOnly={readOnly}
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        id={id}
        disabled={disabled}
      />
    </>
  );
};

export default FormInput;

import React from "react";
import styles from "./TextInput.module.scss";

const FormInput = ({
  type,
  placeholder,
  onChange,
  id,
  name,
  value,
  disabled,
  readOnly,
  max,
  min,
  required,
}) => {
  return (
    <input
      max={max}
      min={min}
      readOnly={readOnly}
      value={value}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      id={id}
      disabled={disabled}
      required={required}
    />
  );
};

export default FormInput;

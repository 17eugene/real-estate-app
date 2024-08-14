import { forwardRef } from "react";
import styles from "./TextInput.module.scss";

const FormInput = forwardRef((props, ref) => {
  return (
    <input
      defaultValue={props.defaultValue}
      max={props.max}
      min={props.min}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      id={props.id}
      disabled={props.disabled}
      ref={ref}
    />
  );
});

export default FormInput;

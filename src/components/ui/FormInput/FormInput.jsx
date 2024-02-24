import { forwardRef } from "react";
import styles from "./TextInput.module.scss";

const FormInput = forwardRef((props, ref) => {
  return (
    <input
      max={props.max}
      min={props.min}
      // readOnly={props.readOnly}
      // value={props.value}
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

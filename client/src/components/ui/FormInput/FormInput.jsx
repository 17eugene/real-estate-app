import { forwardRef } from "react";
import styles from "./FormInput.module.scss";

const FormInput = forwardRef(({ ...props }, ref) => {
  return (
    <input
      className={styles.textInput}
      ref={ref}
      {...props}
      // defaultValue={props.defaultValue}
      // max={props.max}
      // min={props.min}
      // type={props.type}
      // name={props.name}
      // placeholder={props.placeholder}
      // onChange={props.onChange}
      // id={props.id}
      // disabled={props.disabled}
      // ref={ref}
    />
  );
});

export default FormInput;

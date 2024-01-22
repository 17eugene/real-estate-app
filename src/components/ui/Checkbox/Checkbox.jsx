import React from "react";
import styles from "./Checkbox.module.scss";

const Checkbox = ({ label, id, onChange, checked, name }) => {
  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        id={id}
        onChange={onChange}
        checked={checked}
        name={name}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;

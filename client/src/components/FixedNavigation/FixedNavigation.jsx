import styles from "./FixedNavigation.module.scss";

const FixedNavigation = ({ children }) => {
  return (
    <div className={styles.fixedHeaderContent}>
      {/* logo */}
      <div className={styles.logo}>
        <p>Real</p>
        <p>Estate</p>
      </div>
      {children}
    </div>
  );
};

export default FixedNavigation;

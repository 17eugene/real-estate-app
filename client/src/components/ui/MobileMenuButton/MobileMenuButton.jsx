import styles from "./MobileMenuButton.module.scss";

const MobileMenuButton = ({ isActiveMobileMenu, toggleMobileMenu }) => {
  return (
    <div
      onClick={toggleMobileMenu}
      className={
        isActiveMobileMenu
          ? `${styles.burgerMenu} ${styles.active}`
          : `${styles.burgerMenu}`
      }
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default MobileMenuButton;

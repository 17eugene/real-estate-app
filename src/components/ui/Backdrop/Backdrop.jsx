import styles from "./Backdrop.module.scss";

const Backdrop = ({ children, isOpenedEditForm, isOpenedConfirmation }) => {
  return (
    <div
      className={
        isOpenedEditForm || isOpenedConfirmation
          ? `${styles.backdrop} ${styles.active}`
          : `${styles.backdrop}`
      }
    >
      {children}
    </div>
  );
};

export default Backdrop;

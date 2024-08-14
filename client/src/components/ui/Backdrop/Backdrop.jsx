import styles from "./Backdrop.module.scss";

const Backdrop = ({
  children,
  isOpenedEditForm,
  isOpenedConfirmation,
  isOpenedSwiper,
}) => {
  return (
    <div
      className={
        isOpenedEditForm || isOpenedConfirmation || isOpenedSwiper
          ? `${styles.backdrop} ${styles.active}`
          : `${styles.backdrop}`
      }
    >
      {children}
    </div>
  );
};

export default Backdrop;

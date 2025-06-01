import styles from "./Backdrop.module.scss";

const Backdrop = ({
  children,
  isOpenedEditForm,
  isOpenedConfirmation,
  isOpenedSwiper,
  isOpenedChat,
  isOpenedChatMsg,
  activeBackdrop,
  isActiveFallback,
  isOpenedSidebar,
}) => {
  return (
    <div
      className={
        isOpenedEditForm ||
        isOpenedConfirmation ||
        isOpenedSwiper ||
        isOpenedChat ||
        isOpenedChatMsg ||
        activeBackdrop ||
        isActiveFallback ||
        isOpenedSidebar
          ? `${styles.backdrop} ${styles.active}`
          : `${styles.backdrop}`
      }
    >
      {children}
    </div>
  );
};

export default Backdrop;

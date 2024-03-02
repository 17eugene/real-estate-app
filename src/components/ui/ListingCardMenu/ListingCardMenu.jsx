import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "./ListingCardMenu.module.scss";

const ListingCardMenu = ({
  selectedCard,
  listingId,
  isOpenedList,
  closeCardMenuHandler,
}) => {
  return (
    <div
      className={
        selectedCard === listingId && isOpenedList
          ? `${styles.cardMenu} ${styles.opened}`
          : `${styles.cardMenu}`
      }
    >
      <ul>
        <IoCloseCircleOutline
          className={styles.closeIcon}
          onClick={closeCardMenuHandler}
        />
        <li>See</li>
        <li>Edit</li>
        <li>Delete</li>
      </ul>
    </div>
  );
};

export default ListingCardMenu;

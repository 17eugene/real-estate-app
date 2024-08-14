import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listingOperations } from "../../../redux/listing/listing-operations";
import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "./ListingCardMenu.module.scss";

const ListingCardMenu = ({
  selectedCard,
  listingId,
  isOpenedList,
  closeCardMenuHandler,
  openCardDeleteConfirmation,
  isOpenedDeleteConfirmation,
  setIOpenedDeleteConfirmation,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteListingCardHandler = (listingId) => {
    dispatch(listingOperations.deleteListing(listingId));
    setIOpenedDeleteConfirmation(false);
  };

  const onEditClickHandle = (listingId) => {
    navigate(`/edit/${listingId}`);
  };

  return (
    <div
      className={
        selectedCard === listingId && isOpenedList
          ? `${styles.cardMenu} ${styles.opened}`
          : `${styles.cardMenu}`
      }
    >
      {!isOpenedDeleteConfirmation ? (
        <ul>
          <IoCloseCircleOutline
            className={styles.closeIcon}
            onClick={closeCardMenuHandler}
          />
          <li>See</li>
          <li onClick={() => onEditClickHandle(selectedCard)}>Edit</li>
          <li onClick={openCardDeleteConfirmation}>Delete</li>
        </ul>
      ) : (
        <div className={styles.deleteConfirmationContainer}>
          <p>Delete this listing?</p>
          <div>
            <button
              type="button"
              onClick={() => deleteListingCardHandler(selectedCard)}
            >
              Confirm
            </button>
            <button type="button" onClick={openCardDeleteConfirmation}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingCardMenu;

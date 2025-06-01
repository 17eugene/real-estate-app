import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { listingOperations } from "../../../redux/listing/listing-operations";
import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "./ListingCardMenu.module.scss";

const ListingCardMenu = ({
  type,
  listingId,
  selectedListing,
  closeListingMenu,
  toggleDeleteConfirmation,
  isOpenedDeleteConfirmation,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const deleteListingCardHandler = (selectedListingId) => {
    dispatch(listingOperations.deleteListing(selectedListingId));
    toggleDeleteConfirmation();
  };

  const onEditClickHandler = () => {
    navigate(`/edit/${selectedListing}`, { state: { from: pathname } });
  };

  const onViewClickHandler = () => {
    navigate(`/${type}/listing/${selectedListing}`);
  };

  return (
    <>
      <div
        className={
          selectedListing === listingId
            ? `${styles.cardMenuWrapper} ${styles.opened}`
            : `${styles.cardMenuWrapper}`
        }
      >
        {!isOpenedDeleteConfirmation ? (
          <>
            <div
              className={styles.closeMenuIconWrapper}
              onClick={closeListingMenu}
            >
              <IoCloseCircleOutline />
            </div>
            <ul className={styles.cardMenuList}>
              <li onClick={onViewClickHandler}>View</li>
              <li onClick={onEditClickHandler}>Edit</li>
              <li onClick={toggleDeleteConfirmation}>Delete</li>
            </ul>
          </>
        ) : (
          <div className={styles.deleteConfirmationContainer}>
            <p>Delete this listing?</p>
            <div>
              <button
                type="button"
                onClick={() => deleteListingCardHandler(selectedListing)}
              >
                Confirm
              </button>
              <button type="button" onClick={toggleDeleteConfirmation}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ListingCardMenu;

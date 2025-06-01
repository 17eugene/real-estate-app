import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listingOperations } from "../../redux/listing/listing-operations";
import UserListingCard from "../UserListingCard/UserListingCard";
import ListingCardMenu from "../ui/ListingCardMenu/ListingCardMenu";
import styles from "./OwnListings.module.scss";

const OwnListings = ({ isOpenedList, listingsListRef }) => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [isOpenedDeleteConfirmation, setIsOpenedDeleteConfirmation] =
    useState(false);
  const dispatch = useDispatch();

  const { _id } = useSelector((state) => state?.user?.userData);
  const { ownListings } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(listingOperations.getOwnListings(_id));
  }, [dispatch, _id]);

  const openListingMenu = (listingId) => {
    setSelectedListing(listingId);
  };

  const closeListingMenu = () => {
    setSelectedListing(null);
  };

  const toggleDeleteConfirmation = () => {
    setIsOpenedDeleteConfirmation(!isOpenedDeleteConfirmation);
  };

  return (
    <div
      ref={listingsListRef}
      className={
        isOpenedList
          ? `${styles.userListingsWrapper} ${styles.opened}`
          : `${styles.userListingsWrapper}`
      }
    >
      {ownListings.length > 0 ? (
        <div className={styles.cardsContainer}>
          {ownListings?.length
            ? ownListings.map((listing) => (
                <UserListingCard
                  key={listing._id}
                  selectedListingId={listing._id}
                  listing={listing}
                  isOpenedList={isOpenedList}
                  openListingMenu={openListingMenu}
                >
                  <ListingCardMenu
                    listingId={listing._id}
                    type={listing.type}
                    selectedListing={selectedListing}
                    closeListingMenu={closeListingMenu}
                    toggleDeleteConfirmation={toggleDeleteConfirmation}
                    isOpenedDeleteConfirmation={isOpenedDeleteConfirmation}
                  />
                </UserListingCard>
              ))
            : null}
        </div>
      ) : (
        <p>
          You haven't published any listing yet.
          <span>
            <Link to="/create"> Create</Link>
          </span>
        </p>
      )}
    </div>
  );
};

export default OwnListings;

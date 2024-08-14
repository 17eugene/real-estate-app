import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { listingOperations } from "../../redux/listing/listing-operations";
import Container from "../Container/Container";
import UserListingCard from "../UserListingCard/UserListingCard";
import styles from "./UserListings.module.scss";

const UserListings = ({ isOpenedList, listingsListRef }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const dispatch = useDispatch();

  const { id } = useSelector((state) => state?.user?.userData);
  const { listingData, userListings } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(listingOperations.getUserListings(id));
    // const filteredByUserId = listingData?.filter(
    //   (listing) => listing.owner === id
    // );
    // setUserListings(filteredByUserId);
  }, [dispatch, id]);

  return (
    <Container>
      <div
        ref={listingsListRef}
        className={
          isOpenedList
            ? `${styles.userListingsWrapper} ${styles.opened}`
            : `${styles.userListingsWrapper}`
        }
      >
        {userListings.length > 0 ? (
          <UserListingCard
            userListings={userListings}
            isOpenedList={isOpenedList}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        ) : (
          <p>
            You haven't published any listing yet.
            <span>
              <Link to="/create"> Create</Link>
            </span>
          </p>
        )}
      </div>
    </Container>
  );
};

export default UserListings;

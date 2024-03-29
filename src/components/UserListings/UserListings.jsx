import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import { useSelector } from "react-redux";
import styles from "./UserListings.module.scss";
import UserListingCard from "../UserListingCard/UserListingCard";

const UserListings = ({ isOpenedList, listingsListRef }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [userListings, setUserListings] = useState([]);

  const { id } = useSelector((state) => state?.user?.userData);
  const { listingData } = useSelector((state) => state.listing);

  useEffect(() => {
    const filteredByUserId = listingData?.filter(
      (listing) => listing.owner === id
    );
    setUserListings(filteredByUserId);
  }, [listingData, id, listingData.length]);

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

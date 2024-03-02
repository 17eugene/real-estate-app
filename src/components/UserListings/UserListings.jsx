import { useEffect } from "react";
import Container from "../Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { listingOperations } from "../../redux/listing/listing-operations";
import styles from "./UserListings.module.scss";
import UserListingCard from "../UserListingCard/UserListingCard";

const UserListings = ({ isOpenedList, listingsListRef }) => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state?.user?.userData);
  const { userListings } = useSelector((state) => state?.user);

  useEffect(() => {
    dispatch(listingOperations.getUserListings(id));
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
        <UserListingCard
          userListings={userListings}
          isOpenedList={isOpenedList}
        />
      </div>
    </Container>
  );
};

export default UserListings;

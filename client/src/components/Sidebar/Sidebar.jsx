import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listingOperations } from "../../redux/listing/listing-operations";
import useClickOutside from "../../hooks/useClickOutside";
import UserListingCard from "../UserListingCard/UserListingCard";
import { GrClose } from "react-icons/gr";
import styles from "./Sidebar.module.scss";

const Sidebar = ({ toggleSidebar, isOpenedSidebar, authorId }) => {
  const dispatch = useDispatch();

  const { authorsListings } = useSelector((state) => state.listing);

  const navigate = useNavigate();

  useEffect(() => {
    if (authorId) {
      dispatch(listingOperations.getAuthorsListings(authorId));
    }
  }, [dispatch, authorId]);

  const handleClickOutside = () => {
    isOpenedSidebar && toggleSidebar();
  };
  const ref = useClickOutside(handleClickOutside);

  return (
    <div
      ref={ref}
      className={
        isOpenedSidebar
          ? `${styles.sidebar} ${styles.active}`
          : `${styles.sidebar}`
      }
    >
      <div className={styles.closeBtn} onClick={toggleSidebar}>
        <GrClose />
      </div>
      {authorsListings.length > 0 ? (
        <ul className={styles.authorsListingsList}>
          {authorsListings.map((listing) => (
            <li
              className={styles.authorsListingsItem}
              key={listing._id}
              onClick={() => {
                navigate(`/listing/${listing._id}`);
                toggleSidebar();
              }}
            >
              <UserListingCard
                listing={listing}
                isOpenedSidebar={isOpenedSidebar}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Sidebar;

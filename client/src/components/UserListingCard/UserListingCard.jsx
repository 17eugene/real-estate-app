import { useSelector } from "react-redux";
import Loader from "../ui/Loader/Loader";
import { converDateFormat } from "../../utils/convertDateFormat";
import { BsThreeDots } from "react-icons/bs";
import styles from "./UserListingCard.module.scss";

const UserListingCard = ({
  listing,
  children,
  openListingMenu,
  isOpenedSidebar,
}) => {
  const { loading } = useSelector((state) => state?.listing);

  return (
    <>
      {!loading ? (
        <div className={styles.userCard}>
          {children}

          {!isOpenedSidebar ? (
            <div
              className={styles.cardMenuIcon}
              onClick={() => {
                openListingMenu(listing._id);
              }}
            >
              <BsThreeDots />
            </div>
          ) : null}

          <img src={listing.photos[0].url} alt={listing.name} />
          <div className={styles.cardContent}>
            <p>
              {listing.settlement}, {listing.street}, {listing.houseNumber}
            </p>
            <span>${listing.price}</span>
            <span>{converDateFormat(listing.updatedAt)}</span>
          </div>
        </div>
      ) : (
        <Loader width={90} height={20} radius={9} />
      )}
    </>
  );
};

export default UserListingCard;

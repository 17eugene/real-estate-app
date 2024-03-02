import { useState } from "react";
import ListingCardMenu from "../ui/ListingCardMenu/ListingCardMenu";
import { converDateFormat } from "../../utils/convertDateFormat";
import { BsThreeDots } from "react-icons/bs";
import styles from "./UserListingCard.module.scss";

const UserListingCard = ({ userListings, isOpenedList }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const openMenuClickHandle = (listingId) => {
    setSelectedCard(listingId);
  };

  const closeCardMenuHandler = () => {
    setSelectedCard(null);
  };

  return (
    <div className={styles.cardsContainer}>
      {userListings.length
        ? userListings.map(
            ({ _id, name, address, photos, createdAt, price }) => (
              <div key={_id}>
                <div
                  className={styles.cardMenuIcon}
                  onClick={() => {
                    openMenuClickHandle(_id);
                  }}
                >
                  <BsThreeDots />
                </div>
                <img width={150} height={100} src={photos[0]} alt={name} />
                <p>{address}</p>
                <p>{price} $</p>
                <p>{converDateFormat(createdAt)}</p>

                <ListingCardMenu
                  isOpenedList={isOpenedList}
                  selectedCard={selectedCard}
                  listingId={_id}
                  closeCardMenuHandler={closeCardMenuHandler}
                />
              </div>
            )
          )
        : null}
    </div>
  );
};

export default UserListingCard;

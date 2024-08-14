import { useState } from "react";
import ListingCardMenu from "../ui/ListingCardMenu/ListingCardMenu";
import { converDateFormat } from "../../utils/convertDateFormat";
import { BsThreeDots } from "react-icons/bs";
import styles from "./UserListingCard.module.scss";

const UserListingCard = ({
  userListings,
  isOpenedList,
  selectedCard,
  setSelectedCard,
}) => {
  const [isOpenedDeleteConfirmation, setIsOpenedDeleteConfirmation] =
    useState(false);

  const openCardMenuHandler = (listingId) => {
    setSelectedCard(listingId);
  };

  const closeCardMenuHandler = () => {
    setSelectedCard(null);
  };

  const openCardDeleteConfirmation = () => {
    setIsOpenedDeleteConfirmation(!isOpenedDeleteConfirmation);
  };

  return (
    <div className={styles.cardsContainer}>
      {userListings?.length
        ? userListings.map(
            ({ _id, name, address, photos, createdAt, price }) => (
              <div key={_id}>
                <div
                  className={styles.cardMenuIcon}
                  onClick={() => {
                    openCardMenuHandler(_id);
                  }}
                >
                  {!isOpenedDeleteConfirmation ? <BsThreeDots /> : null}
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
                  openCardDeleteConfirmation={openCardDeleteConfirmation}
                  isOpenedDeleteConfirmation={isOpenedDeleteConfirmation}
                  setIOpenedDeleteConfirmation={setIsOpenedDeleteConfirmation}
                />
              </div>
            )
          )
        : null}
    </div>
  );
};

export default UserListingCard;

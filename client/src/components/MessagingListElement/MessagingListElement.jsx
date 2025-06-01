import ListingTypeLabel from "../ui/ListingTypeLabel/ListingTypeLabel";
import { MdDeleteOutline } from "react-icons/md";
import styles from "./MessagingListElement.module.scss";

const MessagingListElement = ({
  selectChatRoomHandler,
  listingType,
  listingSettlement,
  listingStreet,
  listingHouseNumber,
  listingPrice,
  chatWith,
}) => {
  return (
    <li className={styles.messagingElement} onClick={selectChatRoomHandler}>
      <MdDeleteOutline className={styles.deleteIcon} />
      <div className={styles.listingInfo}>
        <div className={styles.listingTypeWrapper}>
          <ListingTypeLabel listingType={listingType} />
        </div>
        <div>
          <p>
            {listingSettlement}, {listingStreet} {listingHouseNumber} -{" "}
            <span>${listingPrice}</span>
          </p>
        </div>
      </div>

      <div className={styles.chatWithInfo}>
        <p>Chat with: {chatWith[0]}</p>
      </div>
    </li>
  );
};

export default MessagingListElement;

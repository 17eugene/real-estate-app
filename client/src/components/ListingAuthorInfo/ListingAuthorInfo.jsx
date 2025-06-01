import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar/Avatar";
import Loader from "../ui/Loader/Loader";
import { IoIosArrowRoundForward } from "react-icons/io";
import styles from "./ListingAuthorInfo.module.scss";
import { chatOperations } from "../../redux/chat/chat-operations";

const ListingAuthorInfo = ({ setIsOpenedChat, listingId, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listingAuthor = useSelector(
    (state) => state.listing?.listingData.currentListing?.owner
  );
  const { userData } = useSelector((state) => state.user);
  const { room, chatLoading, messageLoading } = useSelector(
    (state) => state.chat
  );

  const onOpenChatHandler = async () => {
    if (!userData) {
      navigate("/signin", { replace: true });
      return;
    }

    let result = null;

    if (!room) {
      result = await dispatch(
        chatOperations.openChatRoom({
          listing: listingId,
          chatCreator: userData?._id,
          listingAuthor: listingAuthor?._id,
        })
      );
    } else {
      result = await dispatch(chatOperations.getChatMessagesHistory(room?._id));
    }

    (result?.payload?.code === 200 || result?.payload?.code === 201) &&
      setIsOpenedChat(true);
  };

  return (
    <div className={styles.userInfoSection}>
      <span>Author</span>
      <div className={styles.userDetails}>
        <Avatar source={listingAuthor?.avatar} width="70px" height="70px" />
        <span>{listingAuthor?.username}</span>
      </div>

      {!chatLoading ? (
        <button
          onClick={onOpenChatHandler}
          className={
            listingAuthor?._id === userData?._id ? styles.hidden : null
          }
        >
          Send a message
        </button>
      ) : (
        <div className={styles.loaderWrapper}>
          <Loader height={50} width={100} radius={9} />
        </div>
      )}

      {!chatLoading ? (
        <Link className={styles.showAll} to="#">
          <span onClick={toggleSidebar}>View author's listings</span>
          <IoIosArrowRoundForward />
        </Link>
      ) : null}
    </div>
  );
};

export default ListingAuthorInfo;

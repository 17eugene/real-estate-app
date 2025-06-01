import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSocketContext } from "../../context/SocketContext";
import { chatOperations } from "../../redux/chat/chat-operations";
import { selectChatRoom } from "../../redux/chat/chatSlice";
import Container from "../../components/Container/Container";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import Backdrop from "../../components/ui/Backdrop/Backdrop";
import MessagingListElement from "../../components/MessagingListElement/MessagingListElement";
import Loader from "../../components/ui/Loader/Loader";
import styles from "./Messaging.module.scss";

const Messaging = () => {
  const [isOpenedChat, setIsOpenedChat] = useState(false);

  const dispatch = useDispatch();
  const { socket } = useSocketContext();

  const userRooms = useSelector((state) => state.chat.roomCollection);
  const userId = useSelector((state) => state.user.userData._id);
  const { room, chatLoading, chatError } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(chatOperations.getUserChatRooms(userId));
  }, [dispatch, userId]);

  const selectChatRoomHandler = async (roomId) => {
    const room = userRooms.find((room) => room._id === roomId);
    if (room) {
      dispatch(selectChatRoom(room));

      const response = await dispatch(
        chatOperations.getChatMessagesHistory(roomId)
      );

      response?.payload?.code === 200 && setIsOpenedChat(true);
    }
  };

  if (chatLoading)
    return (
      <Backdrop activeBackdrop>
        <Loader width={90} height={20} radius={10} />
      </Backdrop>
    );

  return (
    <>
      <Container>
        {!chatError ? (
          <>
            <h1 className={styles.title}>Your message history</h1>
            <div className={styles.correspondenceWrapper}>
              {userRooms.length > 0 ? (
                <ul>
                  {userRooms.map((room) => (
                    <MessagingListElement
                      selectChatRoomHandler={() =>
                        selectChatRoomHandler(room?._id)
                      }
                      socket={socket}
                      key={room._id}
                      listingType={room.listing.type}
                      listingSettlement={room.listing.settlement}
                      listingStreet={room.listing.street}
                      listingHouseNumber={room.listing.houseNumber}
                      listingPrice={room.listing.price}
                      chatWith={
                        userId === room?.chatCreator?._id
                          ? [
                              room?.listingAuthor?.username,
                              room?.listingAuthor?.avatar,
                            ]
                          : [
                              room?.chatCreator?.username,
                              room?.chatCreator?.avatar,
                            ]
                      }
                    />
                  ))}
                </ul>
              ) : (
                <p>There is no correspondence yet</p>
              )}
            </div>
          </>
        ) : (
          <p>Error occured: {chatError}</p>
        )}
      </Container>
      {isOpenedChat ? (
        <Backdrop isOpenedChat={isOpenedChat}>
          <ChatWindow
            setIsOpenedChat={setIsOpenedChat}
            socket={socket}
            room={room}
            chatWith={
              userId === room?.chatCreator?._id
                ? [room.listingAuthor?.username, room?.listingAuthor?.avatar]
                : [room.chatCreator?.username, room?.chatCreator?.avatar]
            }
          />
        </Backdrop>
      ) : null}
    </>
  );
};

export default Messaging;

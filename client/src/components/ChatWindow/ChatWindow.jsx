import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { chatOperations } from "../../redux/chat/chat-operations";
import FormInput from "../ui/FormInput/FormInput";
import Button from "../ui/Button/Button";
import Avatar from "../ui/Avatar/Avatar";
import ChatMessage from "../ChatMessage/ChatMessage";
import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "./ChatWindow.module.scss";

const ChatWindow = ({ setIsOpenedChat, room, socket, chatWith }) => {
  const dispatch = useDispatch();

  const lastMessageRef = useRef(null);

  const userId = useSelector((state) => state.user?.userData?._id);
  const listingOwner = useSelector(
    (state) => state.listing.currentListing?.owner?._id
  );
  const messagesHistory = useSelector((state) => state.chat.messages);

  socket?.on("connect", () => {
    console.log(`${socket?.connected}`);
  });

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesHistory]);

  useEffect(() => {
    socket?.emit("join-room", room?._id);
  }, [socket, room]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const sendMessage = (data) => {
    const message = {
      text: data.message,
      author: userId,
      recipient: listingOwner,
      room: room?._id,
      createdAt: new Date(Date.now()),
    };
    dispatch(chatOperations.createChatMessage(message));
    // socket.emit("send-message", message);
    reset();
  };

  useEffect(() => {
    socket?.on("receive-message", (message) => {
      dispatch(chatOperations.getChatMessagesHistory(message?.room));
    });

    return () => socket?.off("receive-message");
  }, [socket, dispatch]);

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.interlocutorInfo}>
        <Avatar source={chatWith[1]} width={40} height={40} />
        <p>{chatWith[0]}</p>
      </div>
      <IoCloseCircleOutline
        className={styles.closeIcon}
        onClick={() => setIsOpenedChat(false)}
      />
      <div className={styles.chatContainer}>
        {messagesHistory.length > 0 &&
          messagesHistory.map((msg, idx) => (
            <div ref={lastMessageRef} key={idx}>
              <ChatMessage message={msg} userId={userId} />
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit(sendMessage)}>
        <FormInput
          type="text"
          name="message"
          placeholder="Write your message..."
          {...register("message", { trim: true })}
        />
        <Button type="submit" text="Send" />
      </form>
    </div>
  );
};

export default ChatWindow;

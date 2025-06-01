import React from "react";
import { extractTime } from "../../utils/extractDate";
import styles from "./ChatMessage.module.scss";

const ChatMessage = ({ userId, message }) => {
  return (
    <div
      className={
        message?.author === userId
          ? `${styles.messageWrapper} ${styles.author}`
          : `${styles.messageWrapper} ${styles.recipient}`
      }
    >
      <p className={styles.messageText}>{message?.text}</p>
      <span
        className={
          message?.author === userId
            ? `${styles.messageTime} ${styles.author}`
            : `${styles.messageTime} ${styles.recipient}`
        }
      >
        {extractTime(message?.createdAt)}
      </span>
    </div>
  );
};

export default ChatMessage;

import React from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import styles from "./Notification.module.scss";

const Notification = ({ content, status }) => {
  return (
    <div className={styles.notificationWrapper}>
      <div
        className={
          status === 201
            ? `${styles.notification} ${styles.success}`
            : `${styles.notification} ${styles.success}`
        }
      >
        {status === 201 ? <AiOutlineFileDone /> : <MdErrorOutline />}
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Notification;

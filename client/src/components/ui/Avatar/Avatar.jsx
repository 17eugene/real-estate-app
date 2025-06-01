import React from "react";
import styles from "./Avatar.module.scss";

const Avatar = ({ source, width, height }) => {
  return (
    <img
      className={styles.avatarImg}
      src={source}
      alt="user avatar"
      width={width}
      height={height}
    />
  );
};

export default Avatar;

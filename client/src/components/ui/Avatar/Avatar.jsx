import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Avatar.module.scss";

const Avatar = ({ source, width, height }) => {
  return (
    <div className={styles.avatarWrapper}>
      <NavLink to="/profile">
        <img src={source} alt="user avatar" width={width} height={height} />
      </NavLink>
    </div>
  );
};

export default Avatar;

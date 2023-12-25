import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/ui/Loader/Loader";
import Button from "../../components/ui/Button/Button";
import Avatar from "../../components/ui/Avatar/Avatar";
import Backdrop from "../../components/ui/Backdrop/Backdrop";
import styles from "./Profile.module.scss";

const Profile = () => {
  const [isOpenedEditForm, setIsOpenEditForm] = useState(false);

  const dispatch = useDispatch();
  const { username, email, avatar } = useSelector(
    (state) => state?.user?.userData
  );

  const onEditHanleClick = () => {
    setIsOpenEditForm(true);
  };
  return (
    <>
      {isOpenedEditForm ? (
        <Backdrop
          username={username}
          email={email}
          setIsOpenEditForm={setIsOpenEditForm}
        />
      ) : null}
      <div className={styles.profileFormWrapper}>
        <Avatar source={avatar} width="120px" height="120px" />
        <div className={styles.userInfo}>
          <div className={styles.userInfo__field}>
            <p>
              Username: <span>{username}</span>
            </p>
            {/* <FaRegEdit className={styles.editIcon} /> */}
          </div>
          <div className={styles.userInfo__field}>
            <p>
              E-mail: <span>{email}</span>
            </p>
            {/* <FaRegEdit className={styles.editIcon} /> */}
          </div>

          <div className={styles.profileFormWrapper__buttonsWrapper}>
            <Button type="button" text="edit" onClick={onEditHanleClick} />
            <Button type="button" text="sign out" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

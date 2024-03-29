import React from "react";
import { useSelector } from "react-redux";
import EditProfileForm from "../ui/EditProfileForm/EditProfileForm";
import DeleteProfile from "../ui/DeleteProfile/DeleteProfile";
import useClickOutside from "../../hooks/useClickOutside";
import styles from "./PopupWindow.module.scss";

const PopupWindow = ({
  isOpenedEditForm,
  setIsOpenEditForm,
  isOpenedConfirmation,
  setIsOpenedConfirmation,
  onConfirmDeleteAccountClick,
}) => {
  const { username, email } = useSelector((state) => state?.user?.userData);

  const handleClickOutside = () => {
    isOpenedEditForm
      ? setIsOpenEditForm(false)
      : setIsOpenedConfirmation(false);
  };

  const ref = useClickOutside(handleClickOutside);

  return (
    <div ref={ref} className={styles.popupWindow}>
      {isOpenedEditForm ? (
        <EditProfileForm
          setIsOpenEditForm={setIsOpenEditForm}
          username={username}
          email={email}
        />
      ) : isOpenedConfirmation ? (
        <DeleteProfile
          setIsOpenedConfirmation={setIsOpenedConfirmation}
          content="Are you sure you want to delete your account?"
          onConfirmDeleteAccountClick={onConfirmDeleteAccountClick}
        />
      ) : null}
    </div>
  );
};

export default PopupWindow;

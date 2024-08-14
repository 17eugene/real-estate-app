import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userOperations } from "../../../redux/user/user-operations";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./EditProfileForm.module.scss";

const EditProfileForm = ({ setIsOpenEditForm, username, email }) => {
  const [editFormValue, setEditFormValue] = useState({ username, email });
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.userData);
  const { loading } = useSelector((state) => state?.user);
  const inputChangeHandler = (e) => {
    setEditFormValue({
      ...editFormValue,
      [e.target.name]: e.target.value,
    });
  };

  console.log(editFormValue);

  const onCloseClickHandler = () => {
    setIsOpenEditForm(false);
  };

  const onSubmitHandleClick = async (e) => {
    e.preventDefault();
    const res = await dispatch(userOperations.update({ id, ...editFormValue }));

    if (res.payload.code === 204) {
      setIsOpenEditForm(false);
    }
  };
  return (
    <form className={styles.editForm}>
      <IoIosCloseCircleOutline
        className={styles.closeIcon}
        onClick={onCloseClickHandler}
      />
      <FormInput
        onChange={inputChangeHandler}
        type="text"
        name="username"
        value={editFormValue.username}
        placeholder="Username"
      />
      <FormInput
        onChange={inputChangeHandler}
        type="text"
        name="email"
        value={email}
        placeholder="E-mail"
        disabled
        readOnly
      />
      <Button
        disabled={
          loading ||
          !editFormValue.username.trim() ||
          !editFormValue.email.trim()
            ? true
            : false
        }
        loading={loading}
        type="submit"
        text="confirm"
        onClick={onSubmitHandleClick}
      />
    </form>
  );
};

export default EditProfileForm;

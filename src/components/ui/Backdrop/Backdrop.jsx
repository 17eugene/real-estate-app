import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userOperations } from "../../../redux/user/user-operations";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./Backdrop.module.scss";

const Backdrop = ({ username, email, setIsOpenEditForm }) => {
  const [editFormValue, setEditFormValue] = useState({ username, email });
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.userData);

  console.log(id);

  const inputChangeHandler = (e) => {
    setEditFormValue({
      ...editFormValue,
      [e.target.name]: e.target.value,
    });
  };

  const onCloseClickHandler = () => {
    setIsOpenEditForm(false);
  };

  console.log(id);

  const onSubmitHandleClick = async (e) => {
    e.preventDefault();
    await dispatch(userOperations.update({ id, ...editFormValue }));
  };
  return (
    <div className={styles.backdrop}>
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
          value={editFormValue.email}
          placeholder="E-mail"
          disabled
        />
        <Button type="submit" text="confirm" onClick={onSubmitHandleClick} />
      </form>
    </div>
  );
};

export default Backdrop;

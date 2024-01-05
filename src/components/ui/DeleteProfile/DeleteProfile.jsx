import { useSelector } from "react-redux";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import styles from "./DeleteProfile.module.scss";

const DeleteProfile = ({ content, setIsOpenedConfirmation, onConfirmDeleteAccountClick }) => {
  const { loading } = useSelector((state) => state?.user);

  const onCloseBtnClick = () => {
    setIsOpenedConfirmation(false);
  };
  return (
    <div className={styles.popup}>
      <h3>{content}</h3>
      <div className={styles.buttonsWrapper}>
        {loading ? (
          <Loader width="60px" height="30px" radius="5" />
        ) : (
          <>
            <Button
              text="Confirm"
              type="submit"
              onClick={onConfirmDeleteAccountClick}
            />
            <Button onClick={onCloseBtnClick} text="Close" type="button" />
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteProfile;

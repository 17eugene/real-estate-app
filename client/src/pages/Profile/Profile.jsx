import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
/*------------------------*/
import { userOperations } from "../../redux/user/user-operations";
/*------------------------*/
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
/*------------------------*/
import Loader from "../../components/ui/Loader/Loader";
import Button from "../../components/ui/Button/Button";
import Avatar from "../../components/ui/Avatar/Avatar";
import Backdrop from "../../components/ui/Backdrop/Backdrop";
import Modal from "../../components/Modal/Modal";
import OwnListings from "../../components/OwnListings/OwnListings";
/*------------------------*/
import styles from "./Profile.module.scss";

const Profile = () => {
  const [isOpenedEditForm, setIsOpenEditForm] = useState(false);
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [imgUploadloading, setImgUploadLoading] = useState(false);
  const [isOpenedConfirmation, setIsOpenedConfirmation] = useState(false);
  const [isOpenedList, setIsOpenedList] = useState(false);

  const avatarInputRef = useRef(null);
  const listingsListRef = useRef(null);
  const dispatch = useDispatch();
  const { _id, username, email, avatar } = useSelector(
    (state) => state?.user?.userData
  );

  useEffect(() => {
    const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file?.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          if (progress) {
            setImgUploadLoading(true);
          }
        },
        (err) => {
          setFileUploadError(true);
          setImgUploadLoading(false);
          console.log(err);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            dispatch(
              userOperations.update({ userId: _id, avatar: downloadUrl })
            );
            setImgUploadLoading(false);
            setFileUploadError(false);
          });
        }
      );
    };
    if (file) {
      handleFileUpload(file);
    }
  }, [dispatch, file, _id]);

  // FIREBASE STORAGE
  //allow read;
  //allow write: if
  //request.resource.size < 2 * 1024 * 1024 &&
  //request.resource.contentType.matches('image/.*')

  const onAvatarChangeHandleClick = () => {
    avatarInputRef.current.click();
  };

  const fileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onEditHanleClick = () => {
    setIsOpenEditForm(true);
  };

  const onDeleteAccountClick = () => {
    setIsOpenedConfirmation(true);
  };

  const onConfirmDeleteAccountClick = () => {
    dispatch(userOperations.deleteUser(_id));
  };

  const onSignoutClick = () => {
    dispatch(userOperations.signout());
  };

  const onViewListingsClick = () => {
    setIsOpenedList(!isOpenedList);
  };

  return (
    <>
      <Backdrop
        isOpenedEditForm={isOpenedEditForm}
        isOpenedConfirmation={isOpenedConfirmation}
      >
        <Modal
          isOpenedEditForm={isOpenedEditForm}
          setIsOpenEditForm={setIsOpenEditForm}
          isOpenedConfirmation={isOpenedConfirmation}
          setIsOpenedConfirmation={setIsOpenedConfirmation}
          onConfirmDeleteAccountClick={onConfirmDeleteAccountClick}
        />
      </Backdrop>

      <div className={styles.profileFormWrapper}>
        <h1>Profile</h1>
        {imgUploadloading ? (
          <div className={styles.loaderWrapper}>
            <Loader height="50px" width="100px" radius="9" />
          </div>
        ) : (
          <>
            <div className={styles.avatarWrapper}>
              <Avatar source={avatar} width="120px" height="120px" />
            </div>
            <p
              onClick={onAvatarChangeHandleClick}
              className={styles.changeAvatar}
            >
              Change profile image
            </p>
            {fileUploadError ? (
              <p className={styles.changeAvatarError}>
                Error: Image size must be less then 2MB
              </p>
            ) : null}
          </>
        )}

        <input
          ref={avatarInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={fileInputChange}
        />
        <div className={styles.userInfo}>
          <div className={styles.userInfo__field}>
            <p>
              Username: <span>{username}</span>
            </p>
          </div>
          <div className={styles.userInfo__field}>
            <p>
              E-mail: <span>{email}</span>
            </p>
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <Button type="button" text="edit" onClick={onEditHanleClick} />
          <Button type="button" text="sign out" onClick={onSignoutClick} />
        </div>
        <p onClick={onDeleteAccountClick}>Delete account</p>
      </div>
      <div className={styles.listingListBtn} onClick={onViewListingsClick}>
        <p>{isOpenedList ? "Hide" : "View"} published listings</p>
        <span
          className={
            isOpenedList
              ? `${styles.arrow} ${styles.active}`
              : `${styles.arrow}`
          }
        ></span>
      </div>

      <div className={styles.userListingsWrapper}>
        <OwnListings
          listingsListRef={listingsListRef}
          isOpenedList={isOpenedList}
        />
      </div>
    </>
  );
};

export default Profile;

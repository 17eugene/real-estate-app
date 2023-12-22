import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { userOperations } from "../../redux/user/user-operations";
import Button from "../Button/Button";

const OAuth = () => {
  const dispatch = useDispatch();

  const googleAuthHanleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      await dispatch(
        userOperations.googleAuth({
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        })
      );
    } catch (error) {}
  };

  return (
    <Button
      onClick={googleAuthHanleClick}
      type="button"
      text="continue with google"
    />
  );
};

export default OAuth;

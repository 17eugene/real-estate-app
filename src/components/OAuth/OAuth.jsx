import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userOperations } from "../../redux/user/user-operations";
import Button from "../ui/Button/Button";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleAuthHanleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const userCredentials = await signInWithPopup(auth, provider);
    console.log(userCredentials);

    const result = await dispatch(
      userOperations.googleAuth({
        username: userCredentials.user.displayName,
        email: userCredentials.user.email,
        avatar: userCredentials.user.photoURL,
      })
    );

    if (!result?.error?.message) {
      navigate("/", { replace: true });
    }
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

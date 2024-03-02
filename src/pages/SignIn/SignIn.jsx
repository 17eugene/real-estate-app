import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userOperations } from "../../redux/user/user-operations";
import Button from "../../components/ui/Button/Button";
import FormInput from "../../components/ui/FormInput/FormInput";
import OAuth from "../../components/OAuth/OAuth";
import { MdEmail } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";
import styles from "../SignUp/SignUp.module.scss";

const SignIn = () => {
  const [formValue, setFormValue] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const inputHandleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(userOperations.signin(formValue));

    if (result?.payload?.code === 200) {
      e.target.reset();
      navigate("/", { replace: true });
    }
  };

  const showPasswordClick = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.formWrapper}>
      <h1>Sign In</h1>
      {error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.signForm}>
        <div>
          <FormInput
            placeholder="E-mail"
            type="text"
            id="email"
            name="email"
            onChange={inputHandleChange}
          />
          <MdEmail className={styles.icon} />
        </div>
        <div>
          <FormInput
            placeholder="Password"
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            onChange={inputHandleChange}
          />
          {passwordVisible ? (
            <IoEye onClick={showPasswordClick} className={styles.icon} />
          ) : (
            <IoEyeOff onClick={showPasswordClick} className={styles.icon} />
          )}
        </div>

        <Button
          loading={loading}
          disabled={
            loading || !formValue?.email?.trim() || !formValue?.password?.trim()
          }
          text="Sign In"
          type="submit"
        />
        <OAuth />
        <p>
          Need an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

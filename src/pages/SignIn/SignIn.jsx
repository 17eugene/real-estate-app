import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userOperations } from "../../redux/user/user-operations";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import { MdEmail } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
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

    console.log(result);
    if (result.type.includes("fulfilled")) {
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
        <Button disabled={loading} text="Sign In with GOOGLE" type="button" />
        <p>
          Need an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

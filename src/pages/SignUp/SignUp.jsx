import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import FormInput from "../../components/FormInput/FormInput";
import { BiSolidUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import styles from "./SignUp.module.scss";

const SignUp = () => {
  const [formValue, setFormValue] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const inputHandleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const request = await fetch("http://localhost:2222/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formValue),
    });

    const data = await request.json();
    if (data.code !== 201) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    e.target.reset();
    navigate("/signin", { replace: true });
  };

  const showPasswordClick = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={styles.formWrapper}>
      <h1>Sign Up</h1>
      {error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.signForm}>
        <div>
          <FormInput
            placeholder="Username"
            type="text"
            id="user"
            name="username"
            onChange={inputHandleChange}
          />
          <BiSolidUser className={styles.icon} />
        </div>
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
            loading ||
            !formValue?.username?.trim() ||
            !formValue?.email?.trim() ||
            !formValue?.password?.trim()
          }
          text="Sign Up"
          type="submit"
        />
        <Button disabled={loading} text="Sign up with GOOGLE" type="button" />
        <p>
          Have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
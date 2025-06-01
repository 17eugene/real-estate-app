import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userOperations } from "../../redux/user/user-operations";
import { signInFormSchema } from "../../utils/formValidationSchema";
import Button from "../../components/ui/Button/Button";
import FormInput from "../../components/ui/FormInput/FormInput";
import OAuth from "../../components/OAuth/OAuth";
import { MdEmail } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";
import styles from "../SignUp/SignUp.module.scss";

const SignIn = () => {
  // const [formValue, setFormValue] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = async (data) => {
    const res = await dispatch(userOperations.signin(data));
    if (res.payload.code === 200) {
      reset();
      navigate("/", { replace: true });
    }
  };

  const showPasswordClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.formWrapper}>
      <h1>Sign In</h1>
      {error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onFormSubmit)} className={styles.signForm}>
        <div className={styles.inputWrapper}>
          <FormInput
            placeholder="E-mail"
            type="text"
            id="email"
            name="email"
            {...register("email")}
          />
          <MdEmail className={styles.icon} />
          {errors.email && (
            <p className={styles.validationError}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <FormInput
            placeholder="Password"
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            name="password"
            {...register("password")}
          />
          {isPasswordVisible ? (
            <IoEye onClick={showPasswordClick} className={styles.icon} />
          ) : (
            <IoEyeOff onClick={showPasswordClick} className={styles.icon} />
          )}
          {errors.password && (
            <p className={styles.validationError}>{errors.password.message}</p>
          )}
        </div>

        <Button
          loading={loading}
          disabled={loading}
          text="Sign In"
          type="submit"
        />
        <OAuth />
        <p>
          Need an account?{" "}
          <Link className={styles.link} to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

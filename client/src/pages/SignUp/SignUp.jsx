import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpFormSchema } from "../../utils/formValidationSchema";
import { userOperations } from "../../redux/user/user-operations";
import Button from "../../components/ui/Button/Button";
import FormInput from "../../components/ui/FormInput/FormInput";
import OAuth from "../../components/OAuth/OAuth";
import { BiSolidUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import styles from "./SignUp.module.scss";

const SignUp = () => {
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
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onFormSubmit = (data) => {
    dispatch(userOperations.signup(data));
    if (!error) {
      reset();
      navigate("/signin", { replace: true });
    }
  };

  const showPasswordClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.formWrapper}>
      <h1>Sign Up</h1>
      {error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onFormSubmit)} className={styles.signForm}>
        <div className={styles.inputWrapper}>
          <FormInput
            placeholder="Username"
            type="text"
            id="user"
            name="username"
            {...register("username")}
          />
          <BiSolidUser className={styles.icon} />
          {errors.username && (
            <p className={styles.validationError}>{errors.username.message}</p>
          )}
        </div>
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
          text="Sign Up"
          type="submit"
        />
        <OAuth />
        <p>
          Have an account?{" "}
          <Link to="/signin" className={styles.link}>
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

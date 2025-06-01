import { memo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "../../utils/formValidationSchema";
import { setQueryString } from "../../redux/listing/listingSlice";
import FormInput from "../ui/FormInput/FormInput";
import { IoSearchSharp } from "react-icons/io5";
import styles from "./SearchForm.module.scss";

const SearchForm = memo(() => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  const onSearchClick = useCallback(
    async (data) => {
      navigate("/search");
      dispatch(setQueryString(data.searchQuery));
    },
    [dispatch, navigate]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(onSearchClick)();
    }
  };

  if (pathname === "/") {
    return (
      <form
        className={styles.searchForm}
        onSubmit={handleSubmit(onSearchClick)}
      >
        <FormInput
          type="text"
          placeholder="Enter a region, settlement or a street"
          {...register("searchQuery")}
        />
        <button type="submit">
          <IoSearchSharp className={styles.icon} />
        </button>
      </form>
    );
  } else {
    return (
      <div className={styles.searchContainer} onKeyDown={handleKeyDown}>
        <div className={styles.searchIconWrapper}>
          <IoSearchSharp className={styles.searchIcon} />
        </div>
        <input
          {...register("searchQuery")}
          type="text"
          className={styles.inputSearch}
        />
      </div>
    );
  }
});

export default SearchForm;

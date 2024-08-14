import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setPriceRange,
  setBedroomsNumber,
  setMoreOptions,
} from "../../redux/filtering/filterSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { minMaxPriceSchema } from "../../utils/formValidationSchema";
import FilterButton from "../ui/FilterButton/FilterButton";
import FilterWindow from "../ui/FilterWindow/FilterWindow";
import Button from "../ui/Button/Button";
import { filterOptions } from "../../utils/listingOptions";
import styles from "./FilterSection.module.scss";

const FilterSection = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedBedroomsNumber, setSelectedBedroomsNumber] = useState("any");
  const [exactMatchBedrooms, setExactMatchBedrooms] = useState(false);
  const [moreFilterOptions, setMoreFilterOptions] = useState({
    pets: false,
    furnished: false,
    parking: false,
  });

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(minMaxPriceSchema),
    defaultValues: {
      minimum: 0,
      maximum: 0,
    },
  });

  function selectFilterHandler(name) {
    setActiveFilter(name);

    if (activeFilter === name) {
      setActiveFilter(null);
    }
  }

  function onApplyClickHandler(data) {
    if (activeFilter === "price") {
      if (data.minimum > data.maximum && data.maximum > 0) {
        setValue("maximum", data.minimum);
        dispatch(setPriceRange({ ...data, maximum: data.minimum }));
      } else if (data.minimum > 0 && data.maximum === 0) {
        dispatch(setPriceRange({ minimum: data.minimum }));
      } else if (data.maximum > 0 && data.minimum === 0) {
        dispatch(setPriceRange({ maximum: data.maximum }));
      } else {
        dispatch(setPriceRange(data));
      }

      setActiveFilter(null);
    } else if (activeFilter === "bedrooms") {
      dispatch(setBedroomsNumber(selectedBedroomsNumber));
      setActiveFilter(null);
    } else {
      dispatch(setMoreOptions(moreFilterOptions));
      setActiveFilter(null);
    }
  }

  function exactMatchChangeHandler(e) {
    setExactMatchBedrooms(e.target.checked);
    setSelectedBedroomsNumber("any");
  }

  function onBedroomsNumberChangeHandler(e) {
    setSelectedBedroomsNumber(e.target.value);
  }

  function moreFilterOptionsChangeHandler(e) {
    setMoreFilterOptions((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  }

  return (
    <div className={styles.filterSection}>
      {filterOptions.map((filter, index) => (
        <div className={styles.filterBlock} key={index}>
          <FilterButton
            filter={filter}
            selectFilterHandler={selectFilterHandler}
            selectedFilter={activeFilter}
          />

          {activeFilter === filter.name ? (
            <FilterWindow
              title={filter.title}
              filterName={filter.name}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              onApplyClick={onApplyClickHandler}
              exactMatchChangeHandler={exactMatchChangeHandler}
              exactMatchBedrooms={exactMatchBedrooms}
              onBedroomsNumberChangeHandler={onBedroomsNumberChangeHandler}
              moreFilterOptionsChangeHandler={moreFilterOptionsChangeHandler}
              moreFilterOptions={moreFilterOptions}
            />
          ) : null}
        </div>
      ))}

      <div className={styles.btnContainer}>
        <Button text="Filter" type="button" />
      </div>
    </div>
  );
};

export default FilterSection;

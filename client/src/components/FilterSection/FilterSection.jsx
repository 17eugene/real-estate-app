import { useState } from "react";
/*----------------------------------------------------- */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { minMaxPriceSchema } from "../../utils/formValidationSchema";
import {
  filterOptions,
  bedroomsNumberVariants,
} from "../../utils/listingOptions";
/*----------------------------------------------------- */
import { useListingFilters } from "../../hooks/useListingFilters";
import { transformPriceRangeQueryStr } from "../../utils/transformPriceRangeQueryStr";
import useClickOutside from "../../hooks/useClickOutside";
/*----------------------------------------------------- */
import FilterWindow from "../ui/FilterWindow/FilterWindow";
import FilterButton from "../ui/FilterButton/FilterButton";
import Button from "../ui/Button/Button";
/*----------------------------------------------------- */
import { GrClose } from "react-icons/gr";
/*----------------------------------------------------- */
import styles from "./FilterSection.module.scss";

const FilterSection = ({ isOpenedFilterSection, toggleFilterSection }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [exactMatchBedrooms, setExactMatchBedrooms] = useState(false);

  const { bedrooms, priceRange, moreFilters, setFilters, resetFilters } =
    useListingFilters();

  const ref = useClickOutside(handleClickOutside);

  function handleClickOutside() {
    isOpenedFilterSection && toggleFilterSection();
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(minMaxPriceSchema),
    defaultValues: {
      minimum:
        parseFloat(priceRange.minPrice) ||
        parseFloat(priceRange.exactPrice) ||
        0,
      maximum:
        parseFloat(priceRange.maxPrice) ||
        parseFloat(priceRange.exactPrice) ||
        0,
    },
  });

  function selectFilterHandler(name) {
    setActiveFilter(name);

    if (activeFilter === name) {
      setActiveFilter(null);
    }
  }

  function exactMatchChangeHandler(e) {
    setExactMatchBedrooms(e.target.checked);
    if (bedrooms && bedrooms !== "any") {
      bedroomsNumberVariants.forEach((variant) => {
        if (bedrooms === variant.title) {
          setFilters({ bedrooms: variant.matchTitle });
        } else if (bedrooms === variant.matchTitle) {
          setFilters({ bedrooms: variant.title });
        }
      });
    }
  }

  function onApplyClickHandler(data) {
    if (activeFilter === "price") {
      if (data.minimum > data.maximum) {
        setValue("maximum", 0);
      }
      setFilters({
        minPrice: transformPriceRangeQueryStr(data)?.minPrice,
        maxPrice: transformPriceRangeQueryStr(data)?.maxPrice,
        exactPrice: transformPriceRangeQueryStr(data)?.exactPrice,
      });

      setActiveFilter(null);
    } else if (activeFilter === "bedrooms") {
      setActiveFilter(null);
    } else {
      setActiveFilter(null);
    }
  }

  function resetFiltersHandler() {
    resetFilters();
    setValue("maximum", 0);
    setValue("minimum", 0);
  }

  return (
    <div
      ref={ref}
      className={
        isOpenedFilterSection
          ? `${styles.filterSection} ${styles.active}`
          : styles.filterSection
      }
    >
      <div className={styles.closeBtn} onClick={toggleFilterSection}>
        <GrClose />
      </div>
      {filterOptions?.map((filter, index) => (
        <div className={styles.filtersBlock} key={index}>
          <FilterButton
            filter={filter}
            selectFilterHandler={selectFilterHandler}
            selectedFilter={activeFilter}
            priceRange={priceRange}
            bedrooms={bedrooms}
          />

          {/* {activeFilter === filter.name ? ( */}
          <div
            className={
              activeFilter === filter.name
                ? `${styles.filterWindowWrapper} ${styles.opened}`
                : `${styles.filterWindowWrapper}`
            }
          >
            {/* {activeFilter === filter.name && ( */}
            <FilterWindow
              title={filter.title}
              filterName={filter.name}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              onApplyClick={onApplyClickHandler}
              exactMatchChangeHandler={exactMatchChangeHandler}
              exactMatchBedrooms={exactMatchBedrooms}
              bedrooms={bedrooms}
              setFilters={setFilters}
              moreFilters={moreFilters}
            />
          </div>
        </div>
      ))}

      <div className={styles.btnContainer}>
        <Button text="Reset All" type="button" onClick={resetFiltersHandler} />
      </div>
    </div>
  );
};

export default FilterSection;

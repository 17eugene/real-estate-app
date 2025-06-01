import Button from "../Button/Button";
import FilterByBedrooms from "../FilterByBedrooms/FilterByBedrooms";
import FilterByPrice from "../FilterByPrice/FilterByPrice";
import FilterByOthers from "../FilterByOthers/FilterByOthers";
/*------------------------------------------*/
import styles from "./FilterWindow.module.scss";

const FilterWindow = ({
  title,
  filterName,
  register,
  handleSubmit,
  errors,
  onApplyClick,
  exactMatchChangeHandler,
  exactMatchBedrooms,
  bedrooms,
  setFilters,
  moreFilters,
}) => {
  return (
    <div className={styles.filterWindow}>
      <div className={styles.header}>
        <p>{title}</p>
      </div>
      <>
        {filterName === "price" && (
          <FilterByPrice register={register} errors={errors} />
        )}
      </>
      <>
        {filterName === "bedrooms" && (
          <FilterByBedrooms
            exactMatchChangeHandler={exactMatchChangeHandler}
            exactMatchBedrooms={exactMatchBedrooms}
            bedrooms={bedrooms}
            setFilters={setFilters}
          />
        )}
      </>
      <>
        {filterName === "more" && (
          <FilterByOthers setFilters={setFilters} moreFilters={moreFilters} />
        )}
      </>
      <div className={styles.btnContainer}>
        <Button
          text="Apply"
          type="button"
          onClick={handleSubmit(onApplyClick)}
        />
      </div>
    </div>
  );
};

export default FilterWindow;

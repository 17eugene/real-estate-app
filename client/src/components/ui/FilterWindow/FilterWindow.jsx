import Button from "../Button/Button";
import PriceFilter from "../Filter.PriceFilter/PriceFilter";
import BedroomsFilter from "../Filter.BedroomsFilter/BedroomsFilter";
import MoreFilter from "../Filter.MoreFilter/MoreFilter";
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
  onBedroomsNumberChangeHandler,
  moreFilterOptionsChangeHandler,
  moreFilterOptions,
}) => {
  return (
    <div className={styles.filterWindow}>
      <div className={styles.header}>
        <p>{title}</p>
      </div>
      <>
        {filterName === "price" && (
          <PriceFilter register={register} errors={errors} />
        )}
      </>
      <>
        {filterName === "bedrooms" && (
          <BedroomsFilter
            exactMatchChangeHandler={exactMatchChangeHandler}
            exactMatchBedrooms={exactMatchBedrooms}
            onBedroomsNumberChangeHandler={onBedroomsNumberChangeHandler}
          />
        )}
      </>
      <>
        {filterName === "more" && (
          <MoreFilter
            moreFilterOptionsChangeHandler={moreFilterOptionsChangeHandler}
            moreFilterOptions={moreFilterOptions}
          />
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

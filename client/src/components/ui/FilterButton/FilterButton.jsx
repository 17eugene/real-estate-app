import { printSelectedPriceRange } from "../../../utils/printSelectedPriceRange";
import styles from "./FilterButton.module.scss";

const FilterButton = ({
  filter,
  selectFilterHandler,
  selectedFilter,
  priceRange,
  bedrooms,
}) => {
  return (
    <div
      className={
        selectedFilter === filter.name
          ? `${styles.filterBtn} ${styles.active}`
          : styles.filterBtn
      }
      onClick={() => selectFilterHandler(filter.name)}
    >
      <p>
        {filter.name === "price"
          ? printSelectedPriceRange(priceRange, filter.name)
          : filter.name === "bedrooms" && bedrooms && bedrooms !== "any"
          ? `Bedrooms: ${bedrooms}`
          : filter.name}
      </p>
      <span
        className={
          selectedFilter === filter.name
            ? `${styles.arrow} ${styles.active}`
            : styles.arrow
        }
      ></span>
    </div>
  );
};

export default FilterButton;

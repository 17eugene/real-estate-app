import { useSelector } from "react-redux";
import { transformPriceRangeToString } from "../../../utils/transformPriceRange";
import styles from "./FilterButton.module.scss";

const FilterButton = ({ filter, selectFilterHandler, selectedFilter }) => {
  const { price, bedrooms } = useSelector((state) => state.filter);

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
        {filter.name === "price" && (price?.minimum || price?.maximum)
          ? transformPriceRangeToString(price?.minimum, price?.maximum)
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

import { useSelector } from "react-redux";
import { bedroomsNumberVariants } from "../../../utils/listingOptions";
import styles from "./BedroomsFilter.module.scss";

const BedroomsFilter = ({
  exactMatchChangeHandler,
  exactMatchBedrooms,
  onBedroomsNumberChangeHandler,
}) => {
  const { bedrooms } = useSelector((state) => state.filter.bedrooms);

  return (
    <div className={styles.bedroomsFilterBody}>
      <div className={styles.bedroomsNumberWrapper}>
        {bedroomsNumberVariants.map(({ title, matchTitle }) => (
          <div className={styles.variantWrapper} key={title}>
            <input
              type="radio"
              id={exactMatchBedrooms ? matchTitle : title}
              name={title}
              value={exactMatchBedrooms ? matchTitle : title}
              onChange={onBedroomsNumberChangeHandler}
              checked={bedrooms === title || bedrooms === matchTitle}
            />
            <label
              htmlFor={exactMatchBedrooms ? matchTitle : title}
              className={
                bedrooms === matchTitle || bedrooms === title
                  ? `${styles.label} ${styles.active}`
                  : styles.label
              }
            >
              {exactMatchBedrooms ? matchTitle : title}
            </label>
          </div>
        ))}
      </div>

      <div className={styles.checkbox}>
        <input
          type="checkbox"
          id="match"
          checked={exactMatchBedrooms}
          onChange={exactMatchChangeHandler}
        />
        <label htmlFor="match">Use exact match</label>
      </div>
    </div>
  );
};

export default BedroomsFilter;

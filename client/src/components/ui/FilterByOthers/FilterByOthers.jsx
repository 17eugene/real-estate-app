import styles from "./FilterByOthers.module.scss";

const FilterByOthers = ({ setFilters, moreFilters }) => {
  return (
    <div className={styles.moreFilterBody}>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="pets"
          name="pets"
          checked={moreFilters.petsAllowed === "true"}
          onChange={(e) =>
            setFilters({ ...moreFilters, petsAllowed: e.target.checked })
          }
        />
        <label htmlFor="pets">
          Pets allowed
          <span className={styles.checkmark}></span>
        </label>
      </div>

      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="furnished"
          name="furnished"
          checked={moreFilters.furnished === "true"}
          onChange={(e) =>
            setFilters({ ...moreFilters, furnished: e.target.checked })
          }
        />
        <label htmlFor="furnished">
          Furnished
          <span className={styles.checkmark}></span>
        </label>
      </div>

      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="parking"
          name="parking"
          checked={moreFilters.parking === "true"}
          onChange={(e) =>
            setFilters({ ...moreFilters, parking: e.target.checked })
          }
        />
        <label htmlFor="parking">
          Parking
          <span className={styles.checkmark}></span>
        </label>
      </div>
    </div>
  );
};

export default FilterByOthers;

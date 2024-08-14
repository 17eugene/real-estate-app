import styles from "./MoreFilter.module.scss";

const MoreFilter = ({ moreFilterOptionsChangeHandler, moreFilterOptions }) => {
  return (
    <div className={styles.moreFilterBody}>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="pets"
          name="pets"
          checked={moreFilterOptions.pets}
          onChange={moreFilterOptionsChangeHandler}
        />
        <label htmlFor="pets">Pets allowed</label>
      </div>

      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="furnished"
          name="furnished"
          checked={moreFilterOptions.furnished}
          onChange={moreFilterOptionsChangeHandler}
        />
        <label htmlFor="furnished">Furnished</label>
      </div>

      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          id="parking"
          name="parking"
          checked={moreFilterOptions.parking}
          onChange={moreFilterOptionsChangeHandler}
        />
        <label htmlFor="parking">Parking</label>
      </div>
    </div>
  );
};

export default MoreFilter;

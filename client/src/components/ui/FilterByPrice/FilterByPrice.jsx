import styles from "./FilterByPrice.module.scss";

const FilterByPrice = ({ register, errors }) => {
  return (
    <div className={styles.priceFilterBody}>
      <form>
        <div>
          <p>Minimun:</p>
          <input
            type="number"
            {...register("minimum", { valueAsNumber: true })}
            name="minimum"
          />
          {errors.minimum && <p>{errors.minimum.message}</p>}
        </div>

        <span>-</span>

        <div>
          <p>Maximun:</p>
          <input
            type="number"
            {...register("maximum", {
              valueAsNumber: true,
            })}
            name="maximum"
          />
          {errors.maximum && <p>{errors.maximum.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default FilterByPrice;

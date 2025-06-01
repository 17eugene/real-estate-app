import styles from "./ListingTypeLabel.module.scss";

const ListingTypeLabel = ({ listingType }) => {
  return (
    <div
      className={
        listingType === "sell" ? `${styles.label} ${styles.sell}` : styles.label
      }
    >
      <span>For {listingType === "sell" ? "sale" : listingType}</span>
    </div>
  );
};

export default ListingTypeLabel;

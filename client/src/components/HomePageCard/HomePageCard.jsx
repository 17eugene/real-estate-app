import { Link } from "react-router-dom";
import styles from "./HomePageCard.module.scss";

const HomePageCard = ({ card }) => {
  return (
    <div className={styles.card}>
      <img src={card?.imageURL} alt="card" width={180} height={180} />
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{card?.title}</h3>
        <p>{card?.text}</p>
        <Link to={card?.direction}>{card?.btnText}</Link>
      </div>
    </div>
  );
};

export default HomePageCard;

import SearchForm from "../SearchForm/SearchForm";
import heroImg from "../../assets/heroIMG.webp";
import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <img src={heroImg} alt="hero" />
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Find a better place</h1>
        <SearchForm />
      </div>
      <div className={styles.backdrop}></div>
    </div>
  );
};

export default HeroSection;

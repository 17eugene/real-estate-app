import Container from "../../components/Container/Container";
import HomePageCard from "../../components/HomePageCard/HomePageCard";
import { IoSearchSharp } from "react-icons/io5";
import { cardsContent } from "../../utils/homePageCardsContent";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Find a better place</h1>
          <form className={styles.searchForm}>
            <input type="text" placeholder="Search..." />
            <IoSearchSharp className={styles.icon} />
          </form>
        </div>
      </div>

      {/*FIRST SECTION */}
      <section>
        <Container>
          <div className={styles.sectionContent}>
            <div>
              <h2>Recommendations underway</h2>
              <p>
                Search and save a few homes you like and we'll find
                recommendations for you
              </p>
            </div>
            <div className={styles.banner}></div>
          </div>
        </Container>
      </section>

      {/*SECOND SECTION */}
      <section>
        <Container>
          <div className={styles.sectionContent}>
            {cardsContent.map((card) => (
              <HomePageCard key={card.id} card={card} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Home;

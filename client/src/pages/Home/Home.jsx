import Container from "../../components/Container/Container";
import HomePageCard from "../../components/HomePageCard/HomePageCard";
import { cardsContent } from "../../utils/homePageCardsContent";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <>
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

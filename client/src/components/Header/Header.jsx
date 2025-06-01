import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Container from "../Container/Container";
import Navigation from "../Navigation/Navigation";
import MobileMenuButton from "../ui/MobileMenuButton/MobileMenuButton";
import MobileMenu from "../MobileMenu/MobileMenu";
import SearchForm from "../SearchForm/SearchForm";
import heroImg from "../../assets/heroIMG.webp";
import styles from "./Header.module.scss";

const Header = () => {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);

  const currentUser = useSelector((state) => state.user.userData);
  const { pathname } = useLocation();

  const toggleMobileMenu = () => {
    setIsActiveMobileMenu(!isActiveMobileMenu);
  };

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          {/* logo */}
          <div className={styles.logo}>
            <p>Real</p>
            <p>Estate</p>
          </div>
          <Navigation currentUser={currentUser} />
          <MobileMenuButton
            isActiveMobileMenu={isActiveMobileMenu}
            setIsActiveMobileMenu={setIsActiveMobileMenu}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>
      </Container>
      {/* HERO */}
      {pathname === "/" ? (
        <div className={styles.hero}>
          <img src={heroImg} alt="hero" height={180} />
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Find a better place</h1>
            <SearchForm />
          </div>
          <div className={styles.backdrop}></div>
        </div>
      ) : null}
      <MobileMenu
        isActiveMobileMenu={isActiveMobileMenu}
        toggleMobileMenu={toggleMobileMenu}
      />
    </header>
  );
};

export default Header;

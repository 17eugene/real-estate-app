import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "../Container/Container";
import Navigation from "../Navigation/Navigation";
import MobileMenuButton from "../ui/MobileMenuButton/MobileMenuButton";
import MobileMenu from "../MobileMenu/MobileMenu";
import styles from "./Header.module.scss";

const Header = () => {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const currentUser = useSelector((state) => state.user.userData);
  const headerContentRef = useRef();

  useEffect(() => {
    if (headerContentRef?.current)
      setHeaderHeight(headerContentRef?.current?.offsetHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = document.body.scrollTop;

      if (currentScrollY > headerHeight * 0.75) {
        setIsFixed(true);
      } else if (currentScrollY === 0) {
        setIsFixed(false);
      }

      setLastScrollY(currentScrollY);
    };

    document.body.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.body.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, headerHeight]);

  const toggleMobileMenu = () => {
    setIsActiveMobileMenu(!isActiveMobileMenu);
  };

  return (
    <header
      className={
        isFixed ? `${styles.header} ${styles.active}` : `${styles.header}`
      }
    >
      <Container>
        <div ref={headerContentRef} className={styles.headerContent}>
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

      <MobileMenu
        isActiveMobileMenu={isActiveMobileMenu}
        toggleMobileMenu={toggleMobileMenu}
      />
    </header>
  );
};

export default Header;

import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Container from "../Container/Container";
import MobileMenu from "../MobileMenu/MobileMenu";
import Avatar from "../ui/Avatar/Avatar";
import { IoSearchSharp } from "react-icons/io5";
import styles from "./Header.module.scss";

const Header = () => {
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);
  const currentUser = useSelector((state) => state.user.userData);

  const onBurgerClickHandler = () => {
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

          {/* Search */}
          <form className={styles.searchForm}>
            <input type="text" placeholder="Search..." />
            <IoSearchSharp className={styles.icon} />
          </form>

          {/* Navigation */}
          <ul className={styles.navigation}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            {currentUser ? (
              <>
                <li>
                  <NavLink to="/create">Create</NavLink>
                </li>
                <Avatar
                  source={currentUser?.avatar}
                  width="45px"
                  height="45px"
                />
              </>
            ) : (
              <li>
                <NavLink to="/signin">Sign In</NavLink>
              </li>
            )}
          </ul>

          <div
            onClick={onBurgerClickHandler}
            className={
              isActiveMobileMenu
                ? `${styles.burgerMenu} ${styles.active}`
                : `${styles.burgerMenu}`
            }
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </Container>
      <MobileMenu
        isActiveMobileMenu={isActiveMobileMenu}
        setIsActiveMobileMenu={setIsActiveMobileMenu}
      />
    </header>
  );
};

export default Header;

import React from "react";
import { NavLink } from "react-router-dom";
import Container from "../Container/Container";
import { IoSearchSharp } from "react-icons/io5";
import styles from "./Header.module.scss";

const Header = () => {
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
            <li>
              <NavLink to="/signin">Sign In</NavLink>
            </li>
          </ul>

          <div className={styles.burgerMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;

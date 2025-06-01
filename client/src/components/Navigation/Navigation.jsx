import { NavLink } from "react-router-dom";
import Avatar from "../ui/Avatar/Avatar";
import styles from "./Navigation.module.scss";

const Navigation = ({ currentUser }) => {
  return (
    <>
      {/* Navigation */}
      <ul className={styles.navigation}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.activeNavLink : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/buy"
            className={({ isActive }) => (isActive ? styles.activeNavLink : "")}
          >
            Buy
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/rent"
            className={({ isActive }) => (isActive ? styles.activeNavLink : "")}
          >
            Rent
          </NavLink>
        </li>
        {currentUser ? (
          <>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive ? styles.activeNavLink : ""
                }
              >
                Create
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  isActive ? styles.activeNavLink : ""
                }
              >
                Messages
              </NavLink>
            </li>
            <NavLink to="/profile">
              <Avatar source={currentUser?.avatar} width="60px" height="60px" />
            </NavLink>
          </>
        ) : (
          <li className={styles.signin}>
            <NavLink to="/signin">Sign In</NavLink>
          </li>
        )}
      </ul>
    </>
  );
};

export default Navigation;

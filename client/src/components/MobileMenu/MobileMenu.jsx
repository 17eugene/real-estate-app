import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useClickOutside from "../../hooks/useClickOutside";
import Avatar from "../ui/Avatar/Avatar";
import { GrClose } from "react-icons/gr";
import styles from "./MobileMenu.module.scss";

const MobileMenu = ({ isActiveMobileMenu, toggleMobileMenu }) => {
  const { userData } = useSelector((state) => state?.user);

  const handleClickOutside = () => {
    isActiveMobileMenu && toggleMobileMenu();
  };

  const ref = useClickOutside(handleClickOutside);

  return (
    <div
      ref={ref}
      className={
        isActiveMobileMenu
          ? `${styles.navMenu} ${styles.active}`
          : `${styles.navMenu}`
      }
    >
      <div className={styles.closeBtn} onClick={toggleMobileMenu}>
        <GrClose />
      </div>
      {userData && (
        <>
          <Avatar source={userData?.avatar} width="75px" height="75px" />
          <p className={styles.username}>{userData?.username}</p>
        </>
      )}
      <ul className={styles.navMenu__list} onClick={toggleMobileMenu}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/buy">Buy</NavLink>
        </li>
        <li>
          <NavLink to="/rent">Rent</NavLink>
        </li>
        {userData ? (
          <>
            <li>
              <NavLink to="/create">Create listing</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/messages">Messages</NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="signin">Sign in</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default MobileMenu;

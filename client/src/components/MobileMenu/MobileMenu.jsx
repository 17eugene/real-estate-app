import { NavLink } from "react-router-dom";
import Avatar from "../ui/Avatar/Avatar";
import styles from "./MobileMenu.module.scss";

const MobileMenu = ({ isActiveMobileMenu, setIsActiveMobileMenu }) => {
  //   const { avatar, email } = useSelector((state) => state?.user?.userData);
  //   return (
  //     <div
  //       className={
  //         isActiveMobileMenu
  //           ? `${styles.navMenu} ${styles.active}`
  //           : `${styles.navMenu}`
  //       }
  //     >
  //       <Avatar source={avatar} width="75px" height="75px" />
  //       <p className={styles.email}>{email}</p>
  //       <ul
  //         className={styles.navMenu__list}
  //         onClick={() => setIsActiveMobileMenu(false)}
  //       >
  //         <li>
  //           <NavLink to="/">Home</NavLink>
  //         </li>
  //         <li>
  //           <NavLink to="/about">About</NavLink>
  //         </li>
  //         <li>
  //           <NavLink to="/profile">Profile</NavLink>
  //         </li>
  //       </ul>
  //     </div>
  //   );
};

export default MobileMenu;

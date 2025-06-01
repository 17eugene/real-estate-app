import Container from "../Container/Container";
import { FaMeta } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Container>
        <ul>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Research</a>
          </li>
          <li>
            <a href="/">Careers</a>
          </li>
          <li>
            <a href="/">Help</a>
          </li>
          <li>
            <a href="/">Advertise</a>
          </li>
          <li>
            <a href="/">Fair Housing Guide</a>
          </li>
          <li>
            <a href="/">Advocacy</a>
          </li>
          <li>
            <a href="/">Terms of use</a>
          </li>
        </ul>

        <ul>
          <li>
            <a href="/">Privacy Portal</a>
          </li>
          <li>
            <a href="/">Cookie Preference</a>
          </li>
          <li>
            <a href="/">Learn</a>
          </li>
          <li>
            <a href="/">Mobile apps</a>
          </li>
        </ul>

        <div className={styles.social}>
          <p>Follow us:</p>
          <div>
            <FaMeta />
            <FaXTwitter />
            <FaInstagram />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;

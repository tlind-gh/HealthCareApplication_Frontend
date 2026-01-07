import styles from "./styles/Home.module.css";
import Logo from "../assets/health_care_logo.svg";
import { Link } from "react-router-dom";

// Styles moved to Home.module.css and imported as `styles`.

const Home = () => (
  <div className={styles.homeContainer}>
    <img className={styles.logoContainer} src={Logo} alt="Health Care Logo" />
    <h1 className={styles.title}>Health Care Appointment App</h1>
    <Link className={styles.loginButton} to="/login">
      Login
    </Link>
  </div>
);

export default Home;

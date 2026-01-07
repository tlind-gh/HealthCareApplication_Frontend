import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/health_care_logo.svg";
import styles from "./styles/UserDashboard.module.css";
import Logout from "./Logout";

// Styles moved to UserDashboard.module.css and imported as `styles`.

// Only accessible to users with the "User" role
function UserDashboard() {
  const {
    authState: { user },
  } = useAuth();

  return (
    <div className={styles.userContainer}>
      <img className={styles.logoContainer} src={Logo} alt="Health Care Logo" />
      <h2 className={styles.title}>User Dashboard</h2>
      <p className={styles.text}>Welcome, {user}!</p>
      <Logout />
    </div>
  );
}

export default UserDashboard;

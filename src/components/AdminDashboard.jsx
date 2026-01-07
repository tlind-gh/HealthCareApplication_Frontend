import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/health_care_logo.svg";
import styles from "./styles/AdminDashboard.module.css";
import Logout from "./Logout";

// Styles moved to AdminDashboard.module.css and imported as `styles`.

// Only accessible to users with the "Admin" role
function AdminDashboard() {
  const {
    authState: { user },
  } = useAuth();

  return (
    <div className={styles.adminContainer}>
      <img className={styles.logoContainer} src={Logo} alt="Health Care Logo" />
      <h2 className={styles.title}>Admin Dashboard</h2>
      <p className={styles.text}>Welcome, {user}!</p>
      <Logout />
    </div>
  );
}

export default AdminDashboard;

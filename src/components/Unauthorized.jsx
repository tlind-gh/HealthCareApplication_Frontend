import { useNavigate } from "react-router-dom";
import styles from "./styles/Unauthorized.module.css";

// Styles moved to Unauthorized.module.css and imported as `styles`.

// Unauthorized page component
// Displayed when a user tries to access a page they don't have permission for
function Unauthorized() {
  const navigate = useNavigate();

  // Navigate back to the previous page in browser history
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.unauthorizedContainer}>
      <h2 className={styles.title}>Unauthorized</h2>
      <p className={styles.text}>
        You do not have permission to view this page.
      </p>
      <button
        onClick={goBack}
        aria-label="Go back to previous page"
        className={styles.button}
      >
        Go Back
      </button>
    </div>
  );
}

export default Unauthorized;

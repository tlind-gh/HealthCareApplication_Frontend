import { useAuth } from "../hooks/useAuth";
import styles from "./styles/Availability.module.css";

function Availability() {
  const { authState: { user } } = useAuth();

  return (
    <div>
      <h2>Caregiver Availability</h2>
      <p>Welcome, {user}. This is where you will manage your workday availability.</p>
      <p>
        Next add a date picker and hourly time slots for 08:00–17:00,
        + a button to save your availability.
      </p>
    </div>
  );
}

export default Availability;
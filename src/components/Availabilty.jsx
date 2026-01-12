import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import styles from "./styles/Availability.module.css";

const WORKDAY_START_TIME = 8;
const WORKDAY_END_TIME = 17;

function Availability() {
  const {
    authState: { user },
  } = useAuth();

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10); // YYYY-MM-DD
  });

  const hourlySlots = Array.from(
    { length: WORKDAY_END_TIME - WORKDAY_START_TIME },
    (_, index) => ({
      start: WORKDAY_START_TIME + index,
      end: WORKDAY_START_TIME + index + 1,
    })
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h2 className={styles.title}>Caregiver Availability</h2>
        <p className={styles.subtitle}>
          Welcome, {user}. Choose a date and review your workday slots
          (08:00–17:00).
        </p>
      </header>

      <section className={styles.controls}>
        <label>
          Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
      </section>

      <section>
        <div className={styles.slotsGrid}>
          {hourlySlots.map((slot) => {
            const startLabel = `${String(slot.start).padStart(2, "0")}:00`;
            const endLabel = `${String(slot.end).padStart(2, "0")}:00`;
            return (
              <div key={slot.start} className={styles.slot}>
                {startLabel} – {endLabel}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Availability;

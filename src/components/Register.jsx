import styles from "./styles/LoginRegister.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Username (required)
    if (!userData.username.trim()) {
      newErrors.username = "Username is required";
    }

    // Email (required + format)
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^@]+@[^@]+$/.test(userData.email)) {
      newErrors.email = "Email must be a valid format";
    }

    // Password (required + strong rules)
    if (!userData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{9,}$/.test(
        userData.password
      )
    ) {
      newErrors.password =
        "Password must have minimum: \n- 8 characters in total, \n- 1 upper case letter, \n- 1 lower case letter and \n- 1 number, and 1 special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------- SUBMIT ----------
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        userData,
        { withCredentials: true }
      );

      console.log("Registration successful:", response.data);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Registration failed:", error.response || error);
    }
  };

  return (
    <div className={styles.loginRegisterContainer}>
      <h2 className={styles.title}>Register</h2>

      <form
        className={styles.formWrapper}
        onSubmit={handleRegister}
        aria-label="Registration form"
      >
        <label htmlFor="username">Username *</label>
        <input
          className={styles.styledInput}
          id="username"
          name="username"
          type="text"
          value={userData.username}
          onChange={handleInputChange}
        />
        {errors.username && (
          <p className={styles.errorText}>{errors.username}</p>
        )}

        <label htmlFor="password">Password *</label>
        <input
          className={styles.styledInput}
          id="password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleInputChange}
        />
        {errors.password && (
          <p className={styles.errorText}>{errors.password}</p>
        )}

        <label htmlFor="email">Email *</label>
        <input
          className={styles.styledInput}
          id="email"
          name="email"
          type="text"
          value={userData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}

        {/* First name */}
        <label htmlFor="firstname">First name</label>
        <input
          className={styles.styledInput}
          id="firstname"
          name="firstname"
          type="text"
          value={userData.firstname}
          onChange={handleInputChange}
        />

        {/* Last name */}
        <label htmlFor="lastname">Last name</label>
        <input
          className={styles.styledInput}
          id="lastname"
          name="lastname"
          type="text"
          value={userData.lastname}
          onChange={handleInputChange}
        />
        <span className={styles.requiredText}>* required field</span>

        <button className={styles.submitButton} type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

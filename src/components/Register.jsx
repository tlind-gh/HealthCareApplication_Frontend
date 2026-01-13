import styles from "./styles/Login.module.css";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Register() {
  const { setAuthState } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        credentials,
        {
          // withCredentials: true is required for the server to set HTTP-only cookies
          // This is essential for cookie-based authentication
          withCredentials: true,
        }
      );

      console.log("Registration successful:", JSON.stringify(response.data));

      const { loggedInUser, roles } = response.data;

      // Update global auth state with user information
      setAuthState({
        isAuthenticated: true,
        user: loggedInUser,
        roles: roles,
      });

      // Redirect based on user role
      if (roles.includes("ADMIN")) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/user/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error.response || error);
      setError("Invalid username or password");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>
      {error && <p className={styles.errorText}>{error}</p>}
      <form
        className={styles.formWrapper}
        onSubmit={handleLogin}
        aria-label="Login form"
      >
        <label htmlFor="username">Username:</label>
        <input
          className={styles.styledInput}
          id="username"
          name="username"
          type="text"
          value={credentials.username}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          className={styles.styledInput}
          id="password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />
        <button className={styles.loginButton} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Register;

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import apiFacade from "../assets/apiFacade"

function Signup() {
      const [loginCredentials, setLoginCredentials] = useState({
        username: "",
        password: "",
        repassword: "",
      });

  const navigate = useNavigate();
  const [error, setError] = useState(""); // State for error messages

      const performSignup = (evt) => {
        evt.preventDefault();
            // Check if passwords match
    if (loginCredentials.password !== loginCredentials.repassword) {
        setError("Passwords do not match.");
        return; // Prevent form submission
      }
        apiFacade
          .signUp(loginCredentials.username, loginCredentials.password)
          .then(() => {
            navigate("/login"); // Redirect to home after login
          })
          .catch((error) => {
            console.error("Signup failed", error);
            setError("Signup failed. Please try again.")
          });
      };

      const onChange = (evt) => {
        setLoginCredentials({
          ...loginCredentials,
          [evt.target.id]: evt.target.value,
        });
      };

  return (
    <form onSubmit={performSignup}>
      <h2>Login</h2>
      <input
        id="username"
        placeholder="Username"
        value={loginCredentials.username}
        onChange={onChange}
      />
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={loginCredentials.password}
        onChange={onChange}
      />
    <input
        id="repassword"
        type="password"
        placeholder="Re-enter Password"
        value={loginCredentials.repassword}
        onChange={onChange}
      />
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      <button type="submit">Register</button>
      </form>
  );
}

export default Signup;

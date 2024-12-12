import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import apiFacade from "../assets/apiFacade";

function Login() {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setIsLoggedIn, setUsername } = useOutletContext(); // Get props from MainLayout

  const performLogin = (evt) => {
    evt.preventDefault();
    apiFacade
      .login(loginCredentials.username, loginCredentials.password)
      .then(() => {
        setIsLoggedIn(true);
        setUsername(loginCredentials.username);
        navigate("/"); // Redirect to home after login
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <form onSubmit={performLogin}>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

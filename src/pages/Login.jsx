import { useState } from "react";
import apiFacade from "../assets/apiFacade";

function Login() {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const performLogin = (evt) => {
    console.log(loginCredentials)
    evt.preventDefault();
    apiFacade.login(loginCredentials.username, loginCredentials.password)
      .then(() => {
        // After successful login, redirect or show success message
        console.log("Login successful");
      })
      .catch((error) => {
        // Handle error if login fails
        console.error("Login failed", error);
      });
  };

  const onChange = (evt) => {
    console.log(`Updating ${evt.target.id}: ${evt.target.value}`);
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={performLogin}>
        <input 
          placeholder="User Name" 
          id="username" 
          onChange={onChange} 
          value={loginCredentials.username} 
        />
        <input 
          type="password"
          placeholder="Password" 
          id="password" 
          onChange={onChange} 
          value={loginCredentials.password} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

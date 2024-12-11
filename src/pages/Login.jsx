import { useState } from "react";
import apiFacade from "../assets/apiFacade";

function Login() {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status
  const [username, setUsername] = useState(""); // Stores logged-in user's name

  const performLogin = (evt) => {
    evt.preventDefault();
    console.log(loginCredentials);
    

    apiFacade.login(loginCredentials.username, loginCredentials.password)
      .then(() => {
        console.log("Login successful");
        setIsLoggedIn(true); // Mark user as logged in
        setUsername(loginCredentials.username); // Save username
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };

  const onChange = (evt) => {
    console.log(`Updating ${evt.target.id}: ${evt.target.value}`);
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value });
  };


  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Login;

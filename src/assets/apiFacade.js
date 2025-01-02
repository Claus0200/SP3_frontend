const URL = "https://library.clausjoergensen.dk/api";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from later steps 
  here (REMEMBER to uncomment in the returned 
  object when you do)*/

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  // Decode JWT to get user info
  const decodeToken = (token) => {
    if (!token) return null;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error decoding token", e);
      return null;
    }
  };

  // Get username from the token
  const getUsername = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = decodeToken(token); // Ensure you are decoding the token correctly
      return decoded.username; // Make sure the decoded object has 'username' field
    }
    return null;
  };

  const login = async (user, password) => {
    const options = makeOptions("POST", false, {
      username: user,
      password: password,
    });

    console.log("login: ", user, password); // This is already logged

    try {
      const res = await fetch(URL + "/auth/login", options);
      const data = await handleHttpErrors(res);

      console.log("Login response data:", data); // Log the full response from the API

      // Set token in localStorage
      setToken(data.token);
      console.log("Token set in localStorage:", data.token); // Log the token to ensure it's stored
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const signUp = async (user, password) => {
    const options = makeOptions("POST", false, {
      username: user,
      password: password,
    });

    console.log("Signup: ", user, password); // This is already logged
   
    try {
      const res = await fetch(URL + "/auth/register", options);
      const data = await handleHttpErrors(res);
   
      console.log("Signup response data:", data); // Log the full response from the API

      if (data.token) {
        setToken(data.token);
        console.log("Token set in localStorage:", data.token); // If a token is returned
      } else {
        console.log("Signup successful, no token returned.");
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const fetchData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/info/user", options).then(handleHttpErrors);
  };
  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["Authorization"] = `Baerer ${getToken()}`;
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    getUsername,
    login,
    logout,
    fetchData,
    signUp,
  };
}
const facade = apiFacade();
export default facade;

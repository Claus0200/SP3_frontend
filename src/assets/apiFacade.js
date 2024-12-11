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
            .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
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
      const token = getToken();
      const decodedToken = decodeToken(token);
      return decodedToken ? decodedToken.username : null;
    };

  const login = async (user, password) => {
    const options = makeOptions("POST", false, {
      username: user,
      password: password,
    });
    console.log("login: ", user, password);
    return fetch(URL + "/auth/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
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
  };
}
const facade = apiFacade();
export default facade;
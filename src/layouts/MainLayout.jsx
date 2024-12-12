import { Outlet, useLocation } from "react-router-dom";
import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";
import TopMenu from "../components/TopMenu";
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from "../styles/Theme";
import image from "../assets/logo.png";
import apiFacade from "../assets/apiFacade";
import Login from "../pages/Login";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: var(--medium-device);
  align-items: center;
`;

const Footer = styled.footer`
  color: ${({ theme }) => theme.text};
`;

const Image = styled.img`
  width: 400px;
  height: auto;
`;

function MainLayout() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  const handleLogout = () => {
    apiFacade.logout();
    setIsLoggedIn(false);
    setUsername(null);
  };

  // Check login status on load and on changes to localStorage
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = apiFacade.getToken();
      if (token) {
        setIsLoggedIn(true);
        setUsername(apiFacade.getUsername());
      } else {
        setIsLoggedIn(false);
        setUsername(null);
      }
    };

    checkLoginStatus();

    // Optional: Listen to localStorage changes if login/logout can happen in another tab
    const handleStorageChange = () => checkLoginStatus();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const [theme, setTheme] = useState("light");

  const currentTheme = theme === "light" ? lightTheme : darkTheme;


  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Container>
          <TopMenu
            toggleTheme={toggleTheme}
            handleLogout={handleLogout}
            loggedIn={isLoggedIn}
            username={username}
          />
          <main>
            <Outlet context={{ setIsLoggedIn, setUsername }}
            />
          </main>
          <Image src={image} alt="Logo" />
          <Footer>sp-3-team-2</Footer>
          <Footer>
            &copy; Claus Peter Jørgensen, Benjamin Hernandez, Ferdinand Amstrup
            Vestergaard og Mahdi Michael Karimi
          </Footer>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default MainLayout;

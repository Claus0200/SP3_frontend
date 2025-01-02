import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import apiFacade from "../assets/apiFacade"
import { useEffect, useState } from "react";

const AppContainer = styled.div`
  display: flex;
  height: 70vh;
  width: 70vw;
  background-color: #2F4050;
  border-radius: 20px;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #2F4050;
  color: white;
  padding: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column; 
  flex: 1;
  padding: 0px;
  background-color: #2F4050;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 30px;
  background-color: #2F4050;
`;

const DisplayArea = styled.div`
  padding: 150px;
  background-color: #3F5060;
  border-radius: 100px;
`;

const SidebarItem = styled(NavLink)`
  display: block;
  margin: 10px 0;
  padding: 30px;
  text-decoration: none;
  color: white;
  border-radius: 40px;
  background-color: #c4c1c1;

  &:hover {
    background-color: #2F4060;
  }

  &.active {
    background-color: #1F3040;
    font-weight: 1000;
  }
`;



const WelcomePage = () => <h2>Welcome to your profile!</h2>;
const MyInfoPage = () => <h2>Here is your info!</h2>;
const MyInfoPageDisplay = ({ username }) => {
  return (
    <div>
  <h2>
    Username: {username}
  </h2>
  <h2>
    Password: ****
  </h2>
  </div>
)
};
const LendBooksPage = () => <h2>Here are your lent books!</h2>;

const LendBooksPageDisplay = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchLentBooks = async () => {
      try {
        const response = await fetch(
          "https://library.clausjoergensen.dk/api/lendbooks/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, 
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch lent books");
        }

        const data = await response.json();
        console.log("Fetched lent books:", data);
        setBooks(data?.books || []); 
      } catch (error) {
        console.error("Error fetching lent books:", error);
        setBooks([]); // Fallback to empty array
      }
    };

    fetchLentBooks();
  }, []);

  return (
    <div>
      <h2>Your Lent Books:</h2>
      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => (
            <li key={index}>{book.title || "Unknown Title"}</li>
          ))}
        </ul>
      ) : (
        <p>No books lent yet.</p>
      )}
    </div>
  );
};

const LogOutPage = () => <h2>You have logged out.</h2>;

function User() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchedUsername = apiFacade.getUsername();
    if (!fetchedUsername) {
      setUsername("Guest");
    } else {
      setUsername(fetchedUsername);
    }
  }, []);

  const handleLogout = () =>{
    apiFacade.logout();
    navigate("/user/logout");
    window.location.reload();
  }

  return (
    <AppContainer>
      <Sidebar>
        <SidebarItem>Welcome, {username}</SidebarItem>
        <SidebarItem to="/user/myinfo">My Info</SidebarItem>
        <SidebarItem to="/user/lendbooks">Lend Books</SidebarItem>
        <SidebarItem as="button" onClick={handleLogout}>
          Log Out
        </SidebarItem>
      </Sidebar>
      <MainContent>
      <ContentArea>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="myinfo" element={<MyInfoPage />} />
          <Route path="lendbooks" element={<LendBooksPage />} />
          <Route path="logout" element={<LogOutPage />} />
        </Routes>
      </ContentArea>
      <DisplayArea>
        <Routes>
        <Route path="myinfo" element={<MyInfoPageDisplay username={username} />} />
        <Route path="lendbooks" element={<LendBooksPageDisplay />} />
        </Routes>
      </DisplayArea>
      </MainContent>
    </AppContainer>
  );
}

export default User;
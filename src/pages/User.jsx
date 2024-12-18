import { Routes, Route, NavLink } from "react-router-dom";
import styled from "styled-components";
import info from "../assets/info.svg"

const AppContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
  width: 100vw;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #2F4050;
  color: white;
  padding: 20px;
`;

const SidebarItem = styled(NavLink)`
  display: block;
  margin: 10px 0;
  padding: 10px;
  text-decoration: none;
  color: white;
  border-radius: 4px;

  &:hover {
    background-color: #2F4060;
  }

  &.active {
    background-color: #1F3040;
    font-weight: 1000;
  }
`;

const ContentArea = styled.div`
  flex: 0.83;
  padding: 20px;
  
`;


const WelcomePage = () => <h2>Welcome to your profile!</h2>;
const MyInfoPage = () => <h2>Here is your info!</h2>;
const LendBooksPage = () => <h2>Here are your lent books!</h2>;
const LogOutPage = () => <h2>You have logged out.</h2>;

function User() {
  return (
    <AppContainer>
      <Sidebar>
        <h3>Welcome, user123</h3>
        <SidebarItem to="/user/myinfo"><info fill="currentColor"></info> My Info</SidebarItem>
        <SidebarItem to="/user/lendbooks">Lend Books</SidebarItem>
        <SidebarItem to="/user/logout">Log Out</SidebarItem>
      </Sidebar>
      <ContentArea>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="myinfo" element={<MyInfoPage />} />
          <Route path="lendbooks" element={<LendBooksPage />} />
          <Route path="logout" element={<LogOutPage />} />
        </Routes>
      </ContentArea>
    </AppContainer>
  );
}

export default User;
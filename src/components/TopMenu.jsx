/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";

const StyledMenu = styled.ul`
    display: flex;
    justify-content: center;
    gap: 20px;
`

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
  }
`

function TopMenu({ toggleTheme, loggedIn, username, handleLogout }) {
  useEffect(() => {
    console.log("TopMenu re-rendered - loggedIn:", loggedIn, "username:", username);
  }, [loggedIn, username]);

  return (
    <nav>
      <StyledMenu>
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/vision">Vision</NavLink>
          <NavLink className="nav-link" to="/endpoints">Endpoints</NavLink>
          <NavLink className="nav-link" to="/admin">Admin</NavLink>
        {loggedIn ? (
          <>
            <NavLink className={"nav-link"} to="/account"> Welcome {username}</NavLink>
            <StyledButton onClick={handleLogout}>Logout</StyledButton>
          </>
        ) : (
          <NavLink className="nav-link" to="/login">Login</NavLink>
        )}
        <StyledButton onClick={toggleTheme}>Switch Theme</StyledButton>
      </StyledMenu>
    </nav>
  );
}

export default TopMenu;

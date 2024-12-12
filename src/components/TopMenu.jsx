/* eslint-disable react/prop-types */
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";

const StyledMenu = styled.ul`
  display: flex;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;

  .nav-link {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    font-weight: bold;

    &.active {
      border-bottom: 2px solid ${({ theme }) => theme.text};
    }

    &:hover {
      color: ${({ theme }) => theme.toggleBorder};
      border-bottom: 2px solid ${({ theme }) => theme.text}; /* Keep underline on hover */
    }
  }

  .nav-basket {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    font-weight: bold;
    cursor: pointer;

    &.active {
      border-bottom: 2px solid ${({ theme }) => theme.text}; /* Match NavLink active style */
    }

    &:hover {
      color: ${({ theme }) => theme.toggleBorder};
      border-bottom: 2px solid ${({ theme }) => theme.text}; /* Ensure underline matches theme */
    }
  }
`;

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
`;

function TopMenu({ toggleTheme, loggedIn, username, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const orderedBooks = location.state?.orderedBooks || []; // Retrieve the ordered books

  const isBasketActive = location.pathname === "/book-order";
  useEffect(() => {
    console.log("TopMenu re-rendered - loggedIn:", loggedIn, "username:", username);
  }, [loggedIn, username]);


  return (
    <nav>
      <StyledMenu>
        <NavLink className="nav-link" to="/" end>
          Home
        </NavLink>
        <NavLink className="nav-link" to="/vision">
          Vision
        </NavLink>
        <NavLink className="nav-link" to="/endpoints">
          Endpoints
        </NavLink>
        <NavLink className="nav-link" to="/books">
          Book List
        </NavLink>
        <span
          className={`nav-basket ${isBasketActive ? "active" : ""}`}
          onClick={() => navigate("/book-order", { state: { orderedBooks } })}
        >
          Book Basket
        </span>

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


import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 20px;
        box-sizing: border-box;
        background-color: var(--background-color);
    }

    :root {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;
        width: 100%;
        height: 100%;
        font-size: 16px;
        --body-color: ${({ theme }) => theme.body};
        --text-color: ${({ theme }) => theme.text};
        --border-color: ${({ theme }) => theme.toggleBorder};
        --background-color: ${({ theme }) => theme.background};
        --small-device: 640px;
        --medium-device: 968px;
        text-align: center;
    }

    /* Wireframe */

    a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
    }

    a:hover {
        color: #535bf2;
    }

    body {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        font-size: 2rem;
        color: var(--text-color)
    }

    h2 {
        font-size: 1.5rem;
        color: var(--text-color)
    }

    p {
        font-size: 1rem;
        color: var(--text-color)
    }

    button {
        border-radius: 8px;
    }

    table {
        width: 100%;
        text-align: left;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    ul {
        list-style-type: none;
        display: flex;
    }

    thead {
        background-color: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
    }

    th {
        background-color: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        font-weight: bold;
    }

    tr {
        color: ${({ theme }) => theme.text};
    }

    tbody tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #f1f1f1;
    }
  
    .nav-link {
        color: ${({ theme }) => theme.text};
        text-decoration: none;
    }

    .nav-link:hover {
    color: ${({ theme }) => theme.text}; /* Ensure text remains visible */
    text-decoration: underline;
    cursor: pointer;

    /* Neutral background with transparency for visibility on light/dark */
    background-color: ${({theme}) => theme.body}; /* Neutral gray, semi-transparent */

    /* Gradient with balanced visibility for both light and dark */
    background-image: linear-gradient(
        90deg, 
        rgba(128, 128, 128, 0.3), /* Light gray with transparency */
        rgba(80, 80, 80, 0.3)     /* Darker gray for contrast */
    );

    border-radius: 50px; /* Optional: round corners */
}


`;

export default GlobalStyle;

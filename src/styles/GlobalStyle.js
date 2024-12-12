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

    body {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--text-color);
    }

    h1 {
        font-size: 2rem;
        color: var(--text-color);
    }

    h2 {
        font-size: 1.5rem;
        color: var(--text-color);
    }

    p {
        font-size: 1rem;
        color: var(--text-color);
    }

    button {
        background-color: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        border: 2px solid ${({ theme }) => theme.toggleBorder};
        padding: 10px 15px;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s ease, color 0.3s ease;

        &:hover {
            background-color: ${({ theme }) => theme.text};
            color: ${({ theme }) => theme.body};
        }
    }

    table {
        width: 100%;
        text-align: left;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
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

    input {
        padding: 10px;
        font-size: 1rem;
        color: var(--text-color);
        background-color: ${({ theme }) => theme.body};
        border: 1px solid var(--border-color);
        border-radius: 4px;
    }

    input::placeholder {
        color: var(--text-color);
        opacity: 0.7;
    }
`;

export default GlobalStyle;

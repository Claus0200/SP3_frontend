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
`

export default GlobalStyle;
import { Outlet } from "react-router-dom";
import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";
import TopMenu from "../components/TopMenu";
import { ThemeProvider } from 'styled-components';
import { useState } from "react";
import { darkTheme, lightTheme } from "../styles/Theme";
import image from '../assets/logo.png'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: var(--medium-device);
    align-items: center;
`

const Footer = styled.footer`
    color: ${({ theme }) => theme.text};
`

const Image = styled.img`
    width: 400px;
    height: auto;
    
`

function MainLayout() {

    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((current) => (current === 'light' ? 'dark' : 'light'));
    };

    const currentTheme = theme === 'light' ? lightTheme : darkTheme;

    return (
        <>
        <ThemeProvider theme={currentTheme}>
            <GlobalStyle />
            <Container>
                <TopMenu toggleTheme={toggleTheme}/>
                <main>
                    <Outlet />
                </main>
                <Image src={image}></Image>
                <Footer>sp-3-team-2</Footer>
                <Footer>&copy; Claus Peter Jørgensen, Benjamin Hernandez, Ferdinand Amstrup Vestergaard og Mahdi Michael Karimi</Footer>
            </Container>
        </ThemeProvider>
        </>
    );
}

export default MainLayout;
import styled from "styled-components";
import image from '../assets/logo.png'

const Menu = styled.div`
  display: flex;
  gap: 50px;
`

const Image = styled.img`
    width: 400px;
    height: auto;
    
`

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Menu>
      <a className="nav-link"
        href="https://library.clausjoergensen.dk/api/routes"
        target="_blank"
        rel="noopener noreferrer"
      >
        Deployed API
      </a>
      <a className="nav-link"
        href="https://github.com/cphmk/SP-2_APIHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        SP-2 GitHub Page
      </a>
      <a className="nav-link"
        href="https://github.com/Claus0200/SP3_frontend"
        target="_blank"
        rel="noopener noreferrer"
      >
        SP-3 GitHub Page
      </a>
      </Menu>
      <Image src={image}></Image>
    </>
  );
}

export default Home;

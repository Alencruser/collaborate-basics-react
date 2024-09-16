import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import apiFetch from '../Utils/api';
import Connection from '../Utils/connection';

function NavB() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Basics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Listing categories</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="create-category">
                Creer une categorie
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="S'inscrire/Se connecter">
              <NavDropdown.Item href="/signin?type=register">S'inscrire</NavDropdown.Item>
              <NavDropdown.Item href="/signin?type=connection">
                Se connecter
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/" onClick={ ()=> {
              apiFetch("disconnect").then(() => {
                Connection.disconnect();
              })
            }}>Se deconnecter</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavB;
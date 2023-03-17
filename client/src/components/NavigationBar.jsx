import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"

export default function NavigationBar(){
    return (
        <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Mealify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/dashboard">CookUp 👨‍🍳</Nav.Link>
            <NavDropdown  id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">
                Sign Up
              </NavDropdown.Item>
              <NavDropdown.Item href="/expiry/foods">Expiry Foods</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/expiry/foods/view">
                View Meals/Expiry Tracker
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
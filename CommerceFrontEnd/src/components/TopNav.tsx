import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function TopNav() {
  const [employeeID] = useState(
    localStorage.getItem("employeeID")
  );
  const navigate = useNavigate();
  const handleClick = () =>{
    localStorage.clear();
    navigate('/login');
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container>
        <Navbar.Brand href="#home">Temporary Navigation Bar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/reservationlist">ReservationList</Nav.Link>
            <Nav.Link href="/cubiclelist">CubicleList</Nav.Link>
            <Nav.Link href="/employeelist">EmployeeList</Nav.Link>
            <Nav.Link href="/reservationcreate">ReservationCreate</Nav.Link>
            <Nav.Link href="/cubiclecreate">CubicleCreate</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button onClick={handleClick}>Log Out</Button>
      </Container>
      {employeeID}
    </Navbar>
  );
}

export default TopNav;
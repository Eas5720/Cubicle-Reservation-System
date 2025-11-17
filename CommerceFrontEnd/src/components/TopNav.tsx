import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import getCurrentEmployeeID from '../hooks/getCurrentEmployeeID';

function TopNav() {
  const employeeID = getCurrentEmployeeID();
  
  //const [employeeData, setEmployeeData] = useState<any[]>([])
  const [employeeData, setEmployeeData] = useState({/*AAAAAAAAAAAAAAAAAA*/
    firstName: '',
    lastname: '',
    email: '',
    password: ''
  });
  useEffect(()=>{
    axios.get(`/api/employees/${employeeID}`)
    .then(res => setEmployeeData(res.data))/*AAAAAAAAAAAAAAAAAA*/
    .catch(err => console.log(err));
  }, [employeeID])

  //log out function
  const navigate = useNavigate();
  const handleClick = () =>{
    localStorage.clear();
    navigate('/login');
  }

  

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container>
        <Navbar.Brand href="#home">Commerce Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Button onClick={handleClick}>Log Out</Button>
      </Container>
      {employeeData.firstName}
    </Navbar>
  );
}

export default TopNav;

/*            <Nav.Link href="/reservationlist">ReservationList</Nav.Link>
            <Nav.Link href="/cubiclelist">CubicleList</Nav.Link>
            <Nav.Link href="/employeelist">EmployeeList</Nav.Link>
            <Nav.Link href="/reservationcreate">ReservationCreate</Nav.Link>
            <Nav.Link href="/cubiclecreate">CubicleCreate</Nav.Link>*/
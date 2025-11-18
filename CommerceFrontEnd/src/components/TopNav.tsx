import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import getCurrentEmployeeID from '../hooks/getCurrentEmployeeID';
import { useAuth } from '../context/AuthContext';

function TopNav() {
  const { employeeID, handleLogout } = useAuth();
  const [employee, setEmployee] = useState({//AAAAAAAAAAAAAAAAAA/
    firstName: '',
    lastname: ''
  });

  useEffect(() => {
    axios
      .get(`/api/employees/${employeeID}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => console.log(err));
  }, [employeeID]);

  //log out function
  const handleClick = () => {
    handleLogout();
    //navigate("/login", { replace: true }); // prevent back navigation to protected pages
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container>
        <Navbar.Brand href="/home">Commerce Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {employeeID && <span className="me-3">Welcome, {employee.firstName}</span>}
        <Button variant="outline-danger" onClick={handleClick}>
          Log Out
        </Button>
      </Container>
    </Navbar>
  );
}

export default TopNav;
/*function TopNav() {
  const employeeID = getCurrentEmployeeID();

  //const [employeeData, setEmployeeData] = useState<any[]>([])
  const [employee, setEmployee] = useState({//AAAAAAAAAAAAAAAAAA/
    firstName: '',
    lastname: '',
    email: '',
    password: ''
  });
  useEffect(()=>{
    axios.get(`/api/employees/${employeeID}`)
    .then(res => setEmployee(res.data))//AAAAAAAAAAAAAAAAAA/
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
      {employee.firstName}
    </Navbar>
  );
}

export default TopNav;*/

/*            <Nav.Link href="/reservationlist">ReservationList</Nav.Link>
            <Nav.Link href="/cubiclelist">CubicleList</Nav.Link>
            <Nav.Link href="/employeelist">EmployeeList</Nav.Link>
            <Nav.Link href="/reservationcreate">ReservationCreate</Nav.Link>
            <Nav.Link href="/cubiclecreate">CubicleCreate</Nav.Link>*/
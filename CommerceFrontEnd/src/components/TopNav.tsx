import { Dropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../context/AuthContext';
import getEmployee from '../hooks/getEmployee';

function TopNav() {
  const { employeeID, handleLogout } = useAuth();
  const employee = getEmployee();

  // This code is now in the getEmployee hook
  /*const [employee, setEmployee] = useState({
    firstName: '',
    lastName: ''
  });
  useEffect(() => {
    axios
      .get(`/api/employees/${employeeID}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => console.log(err));
  }, [employeeID]); */

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
        
        {employeeID && <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {employeeID && <span className="me-3">{employee.firstName} {employee.lastName}</span>}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleClick}>Log Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>}
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
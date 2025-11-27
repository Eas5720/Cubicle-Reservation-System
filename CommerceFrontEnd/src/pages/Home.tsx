import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import getEmployee from "../hooks/getEmployee";

function Home() {
  const navigate = useNavigate();
  const employee = getEmployee();

  const handleClick = () =>{
    navigate('/reservationcreate');
  }
  const handleClickView = () =>{
    navigate('/employeeviewreservations');
  }

  return (
    <div>
      <h1>Welcome, {employee.firstName}</h1>
      <Button onClick={handleClick}>Create Reservation</Button>
      <br />
      <br />
      <Button onClick={handleClickView}>View Reservations</Button>
    </div>
  );
}
export default Home;


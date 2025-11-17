import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate('/reservationcreate');
  }
  const handleClickView = () =>{
    navigate('/employeeviewreservations');
  }
  return (
    <div>
      <h1>Welcome</h1>
      <Button onClick={handleClick}>Create Reservation</Button>
      <Button onClick={handleClickView}>View Reservations</Button>
    </div>
  );
}
export default Home;

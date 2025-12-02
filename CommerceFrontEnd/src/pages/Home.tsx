import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import getEmployee from "../hooks/getEmployee";
import logo from "../assets/greycommercelogo.png";

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
      <h1>Welcome, {employee.firstName}!</h1>
      <p>Thank you signing in! Using this login page, you can reserve cubicals in advance to ensure complete privacy while working in the office.
        <div>You can also veiw all cubical reservations you currently have active.</div></p>
      <Button onClick={handleClick}>Create Reservation</Button>
      <br />
      <br />
      <Button onClick={handleClickView}>View Reservations</Button>
      <ImageComponent /> 
    </div>
  );
}
const ImageComponent = () => {
  const imageStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '0',
    right: '0',
    //margin: '20px', // Optional: space from the edge
    //zIndex: 1000, // Optional: ensure it's above other content
    width: '200px', // Optional: set image dimensions
    height: 'auto',
  };

  return (
    <img
      src={logo}
      alt="Description of image"
      style={imageStyle}
    />
  );
};
export default Home;


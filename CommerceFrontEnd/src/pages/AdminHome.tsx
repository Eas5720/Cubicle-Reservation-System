import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import getEmployee from "../hooks/getEmployee";
import logo from "../assets/greycommercelogo.png";

const FixedLogoComponent = () => {
  const imageStyle: React.CSSProperties = {
    position: 'fixed', // Keeps it relative to the browser window
    bottom: '0',       // Anchors it to the bottom of the screen
    right: '0',        // Anchors it to the right of the screen
    margin: '20px',    // Adds spacing around the image
    zIndex: 1000,      // Ensures the logo appears on top of other content
    width: '200px',    // Controls the size of the logo
    height: 'auto',    // Maintains the image's aspect ratio
  };

  return (
    <img
      src={logo}
      alt="Commerce Bank Logo"
      style={imageStyle}
    />
  );
};

function AdminHome() {
  const navigate = useNavigate();
  const employee = getEmployee();

  const handleClickAdminViewRes = () =>{
    navigate('/admincancel');
  }
    const handleClickAdminByCubicle = () =>{
    navigate('/admincancelbycubicle');
  }

  const handleClickAdminByDate = () =>{
    navigate('/admincancelbydate');
  }

  const handleClickAdminByUser = () =>{
    navigate('/admincancelbyuser');
  }

  return (
    <div>
      <h1>Hello Admin Member, {employee.firstName}!</h1>
      <p>Please be aware that your actions on this webpage may affect the reservations that employees made. 
        <div>Actions that you make, such as cancelling reservations, cannot be undone once they are confirmed.</div> 
        <div> Please be conscientious of the actions you make.</div></p>
      <Button onClick={handleClickAdminViewRes}>View All Reservations for All Employees</Button>
      <br />
      <br />
      <Button onClick={handleClickAdminByCubicle}>View Reservations By Cubicle ID Number</Button>
      <br />
      <br />
      <Button onClick={handleClickAdminByDate}>View Reservations By Dates Reserved</Button>
      <br />
      <br />
      <Button onClick={handleClickAdminByUser}>View Reservations By Username</Button>
       <FixedLogoComponent /> 
    </div>
  );
}
export default AdminHome;


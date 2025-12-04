import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import getEmployee from "../hooks/getEmployee";

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
    navigate('/admincancelbyemployee');
  }

  return (
    <div>
      <h1>Hello Admin {employee.firstName}</h1>
      <Button onClick={handleClickAdminViewRes}>View All Reservations</Button>
      <br />
      <br />
      <Button onClick={handleClickAdminByCubicle}>View Reservations By Cubicle</Button>
      <br />
      <br />
      <Button onClick={handleClickAdminByDate}>View Reservations By Date</Button>
      <br />
      <br />
      <Button onClick={handleClickAdminByUser}>View Reservations By Employee</Button>
    </div>
  );
}
export default AdminHome;


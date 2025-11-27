import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import getEmployee from "../hooks/getEmployee";

function AdminHome() {
  const navigate = useNavigate();
  const employee = getEmployee();

  const handleClickAdminViewRes = () =>{
    navigate('/admincancel');
  }

  return (
    <div>
      <h1>Hello Admin {employee.firstName}</h1>
      <Button onClick={handleClickAdminViewRes}>View Reservations By Employee</Button>
    </div>
  );
}
export default AdminHome;


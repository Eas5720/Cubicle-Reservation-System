import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CancelReservationButton from "../components/CancelReservationButton";
import { useAuth } from "../context/AuthContext";
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

function AdminCancel() {
  const {employeeID} = useAuth();

  const [reservation, setReservation] = useState<any[]>([])
  useEffect(()=>{
    axios.get(`/api/reservations`)
    .then(res => setReservation(res.data))
    .catch(err => console.log(err));
  }, [employeeID])

  
  return (
    <div className='container'>
        <div className='mt-3'>
          <h3>All Reservations of Employees</h3>
          <h4>WARNING:</h4>
          <p>The actions you make here affect the reservations of employees. Once an action is made, it CANNOT be undone. Please be mindful.</p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{display: "none"}}>ID</th>
                <th>Employee</th>
                <th>Cubicle Number</th>
                <th>Floor</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Cancel Reservations</th>
              </tr>
            </thead>
            <tbody>
              {
                reservation.map((reservation, index) =>{
                  return <tr key={index}>
                    <td style={{display: "none"}}>{reservation.id}</td>
                    <td>{reservation.employee.firstName} {reservation.employee.lastName}</td>
                    <td>{reservation.cubicle.roomNumber}</td>
                    <td>{reservation.cubicle.floor}</td>
                    <td>{reservation.startDate}</td>
                    <td>{reservation.endDate}</td>
                    <td><CancelReservationButton reservationId={reservation.id}/></td>
                  </tr>
                }) 
              }
            </tbody>
          </Table>
          <FixedLogoComponent />
        </div>
    </div>
  );
}
export default AdminCancel;
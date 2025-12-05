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

//TODO: Make a back button, make a reservation cancel confirmation

function EmployeeViewReservations() {

  const {employeeID} = useAuth();

  const [reservation, setReservation] = useState<any[]>([])
  useEffect(()=>{
    axios.get(`/api/reservations/employees/${employeeID}`)
    .then(res => setReservation(res.data))
    .catch(err => console.log(err));
  }, [employeeID])

  
  return (
    <div className='container'>
        <div className='mt-3'>
          <h3>Your Existing Reservations</h3>
          <p>These are all of the rooms you currently have reserved, as well as their reservation dates.
            <div> You can cancel a reservation at any time, as well as reserve another cubicle at any time.</div></p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{display: "none"}}>ID</th>
                <th>Room Number</th>
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
export default EmployeeViewReservations;

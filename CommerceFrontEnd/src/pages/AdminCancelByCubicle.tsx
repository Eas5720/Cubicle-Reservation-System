import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CancelReservationButton from "../components/CancelReservationButton";
import { useAuth } from "../context/AuthContext";

function AdminCancelByCubicle() {
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
          <h3>All Reservations</h3>
          <h4>WARNING:</h4>
          <p>The actions you make here affect the reservations of employees. Once an action is made, it CANNOT be undone. Please be mindful.</p>
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
          
        </div>
    </div>
  );
}
export default AdminCancelByCubicle;
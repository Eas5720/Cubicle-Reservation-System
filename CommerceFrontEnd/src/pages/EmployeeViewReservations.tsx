import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CancelReservationButton from "../components/CancelReservationButton";
import { useAuth } from "../context/AuthContext";

function EmployeeViewReservations() {
  const {employeeID} = useAuth();

  //TODO: Standardize the naming conventions here
  const [reservation, setReservation] = useState<any[]>([])/*AAAAAAAAAAAAAAAAAA*/
  useEffect(()=>{
    axios.get(`/api/reservations/employees/${employeeID}`)
    .then(res => setReservation(res.data))/*AAAAAAAAAAAAAAAAAA*/
    .catch(err => console.log(err));
  }, [employeeID])

  
  return (
    <div className='container'>
        <div className='mt-3'>
          <h3>Your Reservations</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Floor</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Test</th>
              </tr>
            </thead>
            <tbody>
              {
                reservation.map((reservation, index) =>{
                  return <tr key={index}>
                    <td>{reservation.cubicle.roomNumber}</td>
                    <td>{reservation.cubicle.floor}</td>
                    <td>{reservation.startDate}</td>
                    <td>{reservation.endDate}</td>
                    <td><CancelReservationButton/></td>
                  </tr>
                }) 
              }
            </tbody>
          </Table>
          
        </div>
    </div>
  );
}
export default EmployeeViewReservations;

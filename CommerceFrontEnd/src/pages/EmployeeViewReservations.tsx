import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import CancelReservationButton from "../components/CancelReservationButton";
import getCurrentEmployeeID from "../hooks/getCurrentEmployeeID";

function EmployeeViewReservations() {
  const employeeID = getCurrentEmployeeID();

  //TODO: Standardize the naming conventions here
  const [reservationData, setReservationData] = useState<any[]>([])/*AAAAAAAAAAAAAAAAAA*/
  useEffect(()=>{
    axios.get(`/api/reservations/employees/${employeeID}`)
    .then(res => setReservationData(res.data))/*AAAAAAAAAAAAAAAAAA*/
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
                reservationData.map((data, index) =>{
                  return <tr key={index}>
                    <td>{data.cubicle.roomNumber}</td>
                    <td>{data.cubicle.floor}</td>
                    <td>{data.startDate}</td>
                    <td>{data.endDate}</td>
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

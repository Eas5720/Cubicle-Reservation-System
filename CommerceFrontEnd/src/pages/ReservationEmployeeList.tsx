import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function ReservationEmployeeList() {
  const [employeeID] = useState(
    localStorage.getItem("employeeID")
  );
  const [reservation, setReservation] = useState({
    employeeId: 0,
    cubicleId: 0,
    startDate: null,
    endDate: null
  });
  const [cubicle, setCubicle] = useState({
    roomNumber: '',
    floor: ''
  });

  useEffect(() => {
    axios.get(`/api/reservations/${employeeID}`)
      .then(res => setReservation(res.data))
      .catch(err => console.error(err));
  }, [employeeID]);

  useEffect(() => {
    axios.get(`/api/cubicles/${reservation.cubicleId}`)
      .then(res => setCubicle(res.data))
      .catch(err => console.error(err));
  }, [reservation.cubicleId]);
  
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
              </tr>
            </thead>
            <tbody>
              <td>{cubicle.roomNumber}</td>
              <td>{cubicle.floor}</td>
              <td>{reservation.startDate}</td>
              <td>{reservation.endDate}</td>
            </tbody>
          </Table>
        </div>
    </div>
  );
}
export default ReservationEmployeeList;

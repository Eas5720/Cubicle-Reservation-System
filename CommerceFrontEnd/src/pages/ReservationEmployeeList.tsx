import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function ReservationEmployeeList() {

  const [reservation, setReservation] = useState({
    employeeId: 0,
    cubicleId: 0,
    startDate: null,
    endDate: null
  });

  const [employeeID] = useState(
    localStorage.getItem("employeeID")
  );

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
          <Table>
            <thead>
              <tr>
                <th>Cubical</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              <td>{reservation.startDate}</td>
              <td>{reservation.endDate}</td>
              <td>{cubicle.roomNumber}</td>
              <td>{cubicle.floor}</td>
            </tbody>
          </Table>
        </div>
    </div>
  );
}
export default ReservationEmployeeList;

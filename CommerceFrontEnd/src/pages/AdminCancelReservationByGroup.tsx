import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate} from "react-router-dom";
import GroupConfirmCancelReservationButton from "../components/GroupConfirmCancelReservationButton";


interface Reservation {
  id: number;
  employee: { firstName: string; lastName: string };
  cubicle: { floor: number; roomNumber: string };
  startDate: string;
  endDate: string;
}

function AdminCancelReservationByGroup() {
  const location = useLocation();
  const { filteredReservations } = location.state;
  const [ reservations ] = useState<Reservation[]>([]);

  for (let i = 0; i < filteredReservations.length; i++) {
    reservations[i] = filteredReservations[i];
  }

  const navigate = useNavigate();
  const handleCancel = async () => {
    navigate(-1);
  };

  return (  
    <div>
      <h1>Cancel The Following Reservations?</h1>
        <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th style={{ display: "none"  }}>ID</th>
            <th>Employee</th>
            <th>Cubicle Number</th>
            <th>Floor</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {/*display table mapped to filteredReservations*/}
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td style={{ display: "none" }}>{reservation.id}</td>
              <td>{reservation.employee.firstName} {reservation.employee.lastName}</td>
              <td>{reservation.cubicle.roomNumber}</td>
              <td>{reservation.cubicle.floor}</td>
              <td>{reservation.startDate}</td>
              <td>{reservation.endDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <GroupConfirmCancelReservationButton></GroupConfirmCancelReservationButton>
      <Button className='cancelButton' onClick={handleCancel}>Go Back</Button>
    </div>
  );
}
export default AdminCancelReservationByGroup;

/*
//cancel all button
const cancelAll = async () => {
  //declare first and last id of the filtered reservation list
  const firstId = filteredReservations[0].id;
  const lastId = filteredReservations[filteredReservations.length - 1].id;
  try {
    //loop through indexes between the first and last id
    for (let id = firstId; id <= lastId; id++) {
      let reservationExists = false;
      //loop through the filteredReservations objects to see if they any match the current possible id
      for (let i = 0; i < filteredReservations.length; i++) {
        if (filteredReservations[i].id === id) {
          reservationExists = true;
          break;
        }
      }
      //if one is found that matches, delete that entry
      if (reservationExists) {
        await axios.delete(`/api/reservations/${id}`);
      }
    }
    alert("Reservations canceled");
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert("Failed to cancel reservation");
  }
};
*/
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate} from "react-router-dom";
import ConfirmCancelReservationButton from "../components/ConfirmCancelReservationButton";
import { useAuth } from "../context/AuthContext";

function CancelConfirm() {  
  const {isAdmin} = useAuth();
  const location = useLocation();
  const { reservationId } = location.state;
  const [reservation, setReservation] = useState({
    employee: {
      firstName: '',
      lastName: ''
    },
    cubicle: {
      roomNumber: '',
      floor: ''
    },
    startDate: "",
    endDate: ""
  });
  const navigate = useNavigate();
  const handleCancel = async () => {
    navigate(-1);
  };

  
  useEffect(() => {
    axios.get(`/api/reservations/${reservationId}`)
      .then(res => setReservation(res.data))
      .catch(err => console.error(err));
  }, [reservationId]);

  return (
    
    <div>
      <h1>Cancel Reservation?</h1>
      <Table bordered>
        <thead>
          <tr>
            <th style={{display: isAdmin ? "block": "none"}}>Employee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Cubical Number</th>
            <th>Cubical Floor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{display: isAdmin ? "block": "none"}}>{reservation.employee.firstName} {reservation.employee.lastName}</td>
            <td>{reservation.startDate}</td>
            <td>{reservation.endDate}</td>
            <td>{reservation.cubicle.roomNumber}</td>
            <td>{reservation.cubicle.floor}</td>
          </tr>
        </tbody>
      </Table>
      <ConfirmCancelReservationButton reservationId={reservationId}></ConfirmCancelReservationButton>
      <Button className='cancelButton' onClick={handleCancel}>Go Back</Button>
    </div>
  );
}
export default CancelConfirm;


/*import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate} from "react-router-dom";
import ConfirmCancelReservationButton from "../components/ConfirmCancelReservationButton";
import { useAuth } from "../context/AuthContext";

interface Reservation {
  id: number;
  employee: { firstName: string; lastName: string };
  cubicle: { floor: number; roomNumber: string };
  startDate: string;
  endDate: string;
}

function CancelConfirm() {  
  const {isAdmin} = useAuth();
  const location = useLocation();
  const { reservationId } = location.state;
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);

  const [reservation, setReservation] = useState({
    employee: {
      firstName: '',
      lastName: ''
    },
    cubicle: {
      roomNumber: '',
      floor: ''
    },
    startDate: "",
    endDate: ""
  });
  const navigate = useNavigate();
  const handleCancel = async () => {
    navigate(-1);
  };

  
  useEffect(() => {
    for (var i = 0; i < reservationId.length; i++){
      axios.get(`/api/reservations/${reservationId[i]}`)
        .then(res => allReservations.push(res.data))
        .catch(err => console.error(err));
    }
  }, [reservationId]);

  return (
    
    <div>
      <h1>Cancel Reservation?</h1>
      <Table bordered>
        <thead>
          <tr>
            <th style={{display: isAdmin ? "block": "none"}}>Employee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Cubical Number</th>
            <th>Cubical Floor</th>
          </tr>
        </thead>
        <tbody>
          {allReservations.map((reservation, index) => (
            <tr key={index}>
              <td style={{display: isAdmin ? "block": "none"}}>{reservation.employee.firstName} {reservation.employee.lastName}</td>
              <td>{reservation.startDate}</td>
              <td>{reservation.endDate}</td>
              <td>{reservation.cubicle.roomNumber}</td>
              <td>{reservation.cubicle.floor}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmCancelReservationButton reservationId={reservationId}></ConfirmCancelReservationButton>
      <Button className='cancelButton' onClick={handleCancel}>Go Back</Button>
    </div>
  );
}
export default CancelConfirm;*/
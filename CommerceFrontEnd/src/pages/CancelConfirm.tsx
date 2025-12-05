import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate} from "react-router-dom";
import ConfirmCancelReservationButton from "../components/ConfirmCancelReservationButton";
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
      <h1>Are You Sure You Want to Cancel Your Reservation?</h1>
      <p>Please note that this action cannot be undone. However, you can reserve the same cubicle again if it is still available.</p>
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
      <FixedLogoComponent />
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
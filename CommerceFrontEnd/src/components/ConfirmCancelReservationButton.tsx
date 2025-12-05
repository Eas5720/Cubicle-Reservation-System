import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ConfirmCancelReservationButton({reservationId}: {reservationId: number}) {
    const navigate = useNavigate();
    const handleCancel = async () => {
    try {
      await axios.delete(`/api/reservations/${reservationId}`);
      //alert("Reservation Canceled");
      //window.location.reload();
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to cancel reservation");
    }
  };

  return (
    <Button variant="danger" onClick={handleCancel}>Confirm Cancel</Button>
  );
}

export default ConfirmCancelReservationButton;
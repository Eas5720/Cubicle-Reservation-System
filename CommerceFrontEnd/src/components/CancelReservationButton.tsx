import { Button } from "react-bootstrap";
import axios from "axios";

function CancelReservationButton({reservationId}: {reservationId: number}) {
    
    const handleCancel = async () => {
    try {
      await axios.delete(`/api/reservations/${reservationId}`);
      alert("Reservation Canceled");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel reservation");
    }
  };

  return (
    <Button variant="danger" onClick={handleCancel}>Cancel</Button>
  );
}

export default CancelReservationButton;
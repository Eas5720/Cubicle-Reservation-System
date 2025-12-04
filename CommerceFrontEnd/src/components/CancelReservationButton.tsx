import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CancelReservationButton({reservationId}: {reservationId: number}) {
    const navigate = useNavigate();
    const handleCancel = async () => {
      navigate('../cancelconfirm',{
        state: {
          reservationId
        }
      });
  };

  return (
    <Button variant="danger" onClick={handleCancel}>Cancel</Button>
  );
}

export default CancelReservationButton;
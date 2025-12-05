import { Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function GroupConfirmCancelReservationButton() {
const navigate = useNavigate();
const location = useLocation();
const { filteredReservations } = location.state;
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
    navigate(-1);
  } catch (err) {
    console.error(err);
    alert("Failed to cancel reservation");
  }
};

  return (
    <Button style={{ marginRight: "5px" }} variant="danger" onClick={cancelAll}>Confirm Cancel</Button>
  );
}

export default GroupConfirmCancelReservationButton;
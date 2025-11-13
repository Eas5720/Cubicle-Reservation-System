import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ReservationCreate() {  

  const [employeeIDString] = useState(
    localStorage.getItem("employeeID")
  );
  let employeeID = 0;
  if (employeeIDString!==null){
    employeeID = parseInt(employeeIDString);
  }

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [reservation, setReservation] = useState({
    employeeId: employeeID,
    cubicleId: 1,
    startDate: startDate,
    endDate: endDate
  }); //creates variables to store

  const changeValue=(e)=>{
    console.log(e);
    setReservation({
     ...reservation, [e.target.name]:e.target.value  
    });
    //localStorage.setItem("startDate", response.data.id);
    //localStorage.setItem("endDate", response.data.admin);
    console.log(e.target.name + " name "  );
    console.log(e.target.value + " value " );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  
    try {
      reservation.startDate = startDate;
      reservation.endDate = endDate;
      const response = await axios.post('/api/reservation', reservation);
      console.log('Reservation saved:', response.data);
      alert('Reservation saved successfully!');
    } catch (error) {
      console.error('Error saving reservation:', error);
      alert('Failed to save reservation.');
    }
  };

  return (
    
    <div>
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Start Date</Form.Label>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>End Date</Form.Label>
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
          </Form.Group>

          <Button variant="primary" type="submit">
              Submit
          </Button>
      </Form>
    </div>
  );
}
export default ReservationCreate;

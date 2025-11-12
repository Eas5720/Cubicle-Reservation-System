import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ReservationCreate() {  

  const employeeID = 1;

  const [reservation, setReservation] = useState({
    employee: null,
    cubical:null,
    startDate: '',
    endDate: ''
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
      //const response = await axios.post('/api/reservation', reservation);
      const response = await axios.post('/api/reservation',{
        employeeId: 1,
        cubicalId: 1,
        startDate: '',
        endDate: ''
      });
      console.log('Reservation saved:', response.data);
      alert('Reservation saved successfully!');
      //setReservation({employee:null, cubical:null, startDate: '', endDate: '' });
    } catch (error) {
      console.error('Error saving reservation:', error);
      alert('Failed to save reservation.');
    }
  };

  const [startDate, setStartDate] = useState(new Date());

  return (
    
    <div>
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="input" placeholder="start" name = "startDate" onChange={changeValue}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>End Date</Form.Label>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          </Form.Group>

          <Button variant="primary" type="submit">
              Submit
          </Button>
      </Form>
    </div>
  );
}
export default ReservationCreate;

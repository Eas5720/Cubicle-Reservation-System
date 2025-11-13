import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ReservationCreate() {  

  const [employeeIDString] = useState(
    localStorage.getItem("employeeID")
  );
  let employeeID = 0;
  if (employeeIDString!==null){
    employeeID = parseInt(employeeIDString);
  }

  //const [startDate, setStartDate] = useState(new Date());
  //const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState<any[]>([])

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

  const handleSearchAvailable = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    axios.get('/api/cubicles/available', {
      params: { startDate, endDate }
    })
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  };

  const handleSelectCubicle = (id: number) => {
    reservation.cubicleId = id;
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
      <Form className="mb-3 d-flex gap-2 align-items-end">
        <div>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>

        <Button onClick={handleSearchAvailable} variant="primary">
          Search
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Floor</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cubicle, index) => (
            <tr key={index}>
              <td>{cubicle.roomNumber}</td>
              <td>{cubicle.floor}</td>
              <td><Button onClick={() => handleSelectCubicle(cubicle.id)}>{reservation.cubicleId === cubicle.id ? "Selected" : "Select"}</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      {reservation.cubicleId && (
        <div className="alert alert-info mt-3">
          Selected Cubicle ID: {reservation.cubicleId}
        </div>
      )}
    </div>
  );
}
export default ReservationCreate;
/*
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
*/
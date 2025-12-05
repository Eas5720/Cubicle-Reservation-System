import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ReservationCreate() {  
  const {employeeID} = useAuth();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minStartDate, setMinStartDate] = useState(""); //current date 
  const [maxStartDate, setMaxStartDate] = useState(""); //must be 3 months in the future
  const [minEndDate, setMinEndDate] = useState(""); //must be after start date
  const [maxEndDate,setMaxEndDate] = useState(""); //must be 6 months in the future
  const [cubical, setCubical] = useState<any[]>([])
  const [reservation] = useState({
    employeeId: employeeID,
    cubicleId: 0,
    startDate: startDate,
    endDate: endDate
  }); //creates variables to store

  const setDateLimits = ()=> {
    //Initialize all min/max values.
    setMinStartDate(new Date().toISOString().split("T")[0]);        // current day
    const tempMaxStartDate = new Date();
    tempMaxStartDate.setMonth(tempMaxStartDate.getMonth()+3);
    setMaxStartDate(tempMaxStartDate.toISOString().split("T")[0]);  // 3 months in the future

    if(startDate){
      setMinEndDate(startDate);                                     //End date cannot be before start
    }
    else{
      setMinEndDate(new Date().toISOString().split("T")[0]);
    }
    const tempMaxEndDate = new Date();
    tempMaxEndDate.setMonth(tempMaxEndDate.getMonth()+6);
    setMaxEndDate(tempMaxEndDate.toISOString().split("T")[0]);      // 6 months in the future
  }

  useEffect(() => {
    setDateLimits();

    if (startDate && endDate) {
      if(startDate > endDate){
        setEndDate(startDate);
      }
      axios
        .get("/api/cubicles/available", {
          params: { startDate, endDate },
        })
        .then((res) => {
          setCubical(res.data); 
          reservation.cubicleId = 0; // reset selection when results change
        })
        .catch((err) => console.error(err))
    }
  }, [startDate, endDate]);

  const navigate = useNavigate();
  const handleSubmit = async (id: number) => {
    reservation.startDate = startDate;
    reservation.endDate = endDate;
    reservation.cubicleId = id;
    navigate('reservationconfirm',{
      state: {
        reservation
      }
    });
  };

  return (
    <div>
      <Form className="mb-3 d-flex gap-2 align-items-end">
        <div>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            min={minStartDate}
            max={maxStartDate}
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            min={minEndDate}
            max={maxEndDate}
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
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
          {cubical.map((cubicle, index) => (
            <tr key={index}>
              <td>{cubicle.roomNumber}</td>
              <td>{cubicle.floor}</td>
              <td><Button onClick={() => handleSubmit(cubicle.id)}>Reserve</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default ReservationCreate;
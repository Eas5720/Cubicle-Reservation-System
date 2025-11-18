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
  const [cubical, setCubical] = useState<any[]>([])/*AAAAAAAAAAAAAAAAAA*/
  const [reservation] = useState({
    employeeId: employeeID,
    cubicleId: 0,
    startDate: startDate,
    endDate: endDate
  }); //creates variables to store
  useEffect(() => {
    if (startDate && endDate) {
      axios
        .get("/api/cubicles/available", {
          params: { startDate, endDate },
        })
        .then((res) => {
          setCubical(res.data); /*AAAAAAAAAAAAAAAAAA*/
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
import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function EmployeeViewReservations() {
  const [employeeIDString] = useState(
    localStorage.getItem("employeeID")
  );
  let employeeID = 0;
  if (employeeIDString!==null){
    employeeID = parseInt(employeeIDString);
  }

  const [data, setData] = useState<any[]>([])
  useEffect(()=>{
    axios.get(`/api/reservations/employees/${employeeID}`)
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [employeeID])

  
  return (
    <div className='container'>
        <div className='mt-3'>
          <h3>Your Reservations</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Room Number</th>
                <th>Floor</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Test</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((data, index) =>{
                  return <tr key={index}>
                    <td>{data.cubicle.roomNumber}</td>
                    <td>{data.cubicle.roomNumber}</td>
                    <td>{data.startDate}</td>
                    <td>{data.endDate}</td>
                    <td>Future Cancel Button</td>
                  </tr>
                }) 
              }
            </tbody>
          </Table>
        </div>
    </div>
  );
}
export default EmployeeViewReservations;

import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function ReservationList() {
  const [data, setData] = useState<any[]>([])
  useEffect(()=>{
    axios.get('/api/reservations')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])
  
  return (
    <div className='container'>
        <div className='mt-3'>
          <h3>All Reservations</h3>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Cubical</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((data, index) =>{
                  return <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.employee.firstName}</td>
                    <td>{data.cubical.roomNumber}</td>
                    <td>{data.startDate}</td>
                    <td>{data.endDate}</td>
                  </tr>
                }) 
              }
            </tbody>
          </Table>
        </div>
    </div>
  );
}
export default ReservationList;

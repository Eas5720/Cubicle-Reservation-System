import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function CubicleList() {
  const [data, setData] = useState<any[]>([])
  useEffect(()=>{
    axios.get('/api/cubicles')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])
  
  return (
    <div className='container'>
        <div className='mt-3'>
          <h3>All Cubicles</h3>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Room Number</th>
                <th>Floor</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((data, index) =>{
                  return <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.roomNumber}</td>
                    <td>{data.floor}</td>
                  </tr>
                }) 
              }
            </tbody>
          </Table>
        </div>
    </div>
  );
}
export default CubicleList;

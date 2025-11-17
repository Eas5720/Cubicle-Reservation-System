import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function EmployeeList() {
  const [data, setData] = useState<any[]>([])
  useEffect(()=>{
    axios.get('/api/employees')
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])
  
  return (
    <div className='container'>
        <div className='mt-3'>
          <h3>All Employees</h3>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>email</th>
                <th>password</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((data, index) =>{
                  return <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                    <td>{data.email}</td>
                    <td>{data.password}</td>
                  </tr>
                }) 
              }
            </tbody>
          </Table>
        </div>
    </div>
  );
}
export default EmployeeList;

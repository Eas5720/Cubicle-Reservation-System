import { Table } from "react-bootstrap";

function ReservationList() {
  return (
    <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Author</th>
              <th>Book title</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>J.K Rolling</td>
              <td>Harry Potter</td>
            </tr>
          </tbody>
        </Table>
    </div>
  );
}
export default ReservationList;

import { Button, Form } from "react-bootstrap";

function ReservationCreate() {
  return (
    <div>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Cubical number</Form.Label>
                <Form.Control type="input" placeholder="cubical number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Floor</Form.Label>
                <Form.Control type="input" placeholder="floor" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  );
}
export default ReservationCreate;

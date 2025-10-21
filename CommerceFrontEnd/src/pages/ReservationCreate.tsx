import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function ReservationCreate() {
  const [reservation, setReservation] = useState({
    name: '',
    cubicalID: ''
  }); //creates variables to store


  const changeValue=(e)=>{
    console.log(e);
    setReservation({
     ...reservation, [e.target.name]:e.target.value  
    });
    console.log(e.target.name + " name "  );
    console.log(e.target.value + " value " );
  }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  
    try {
      const response = await axios.post('/api/reservation', reservation);
      console.log('Reservation saved:', response.data);
      alert('Reservation saved successfully!');
      setReservation({ name: '', cubicalID: '' });
    } catch (error) {
      console.error('Error saving reservation:', error);
      alert('Failed to save reservation.');
    }
  };

  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="input" placeholder="name" name = "name" onChange={changeValue}/> 
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Cubical ID</Form.Label>
                <Form.Control type="input" placeholder="cubical id" name = "cubicalID" onChange={changeValue}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  );
}
export default ReservationCreate;

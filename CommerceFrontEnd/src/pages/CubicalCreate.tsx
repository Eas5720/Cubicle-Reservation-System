import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function CubicalCreate() {
  const [cubical, setCubical] = useState({
    roomNumber: '',
    floor: ''
  }); //creates variables to store


  const changeValue=(e: { target: { name: string; value: string; }; })=>{
    console.log(e);
    setCubical({
     ...cubical, [e.target.name]:e.target.value  
    });
    console.log(e.target.name + " name "  );
    console.log(e.target.value + " value " );
  }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  
    try {
      const response = await axios.post('/api/cubical', cubical);
      console.log('Cubical saved:', response.data);
      alert('Cubical saved successfully!');
      //setCubical({ roomNumber: '', floor: '' });
    } catch (error) {
      console.error('Error saving cubical:', error);
      alert('Failed to save cubical.');
    }
  };

  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Room Number</Form.Label>
                <Form.Control type="input" placeholder="room" name = "roomNumber" onChange={changeValue}/> 
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Floor</Form.Label>
                <Form.Control type="input" placeholder="floor" name = "floor" onChange={changeValue}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  );
}
export default CubicalCreate;

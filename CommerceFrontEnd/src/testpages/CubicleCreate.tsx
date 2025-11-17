import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function CubicleCreate() {
  const [cubicle, setCubicle] = useState({
    roomNumber: '',
    floor: ''
  }); //creates variables to store


  const changeValue=(e: { target: { name: any; value: any; }; })=>{
    //console.log(e);
    setCubicle({
     ...cubicle, [e.target.name]:e.target.value  
    });
    //console.log(e.target.name + " name "  );
    //console.log(e.target.value + " value " );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  
    try {
      const response = await axios.post('/api/cubicle', cubicle);
      console.log('Cubicle saved:', response.data);
      alert('Cubicle saved successfully!');
      //setCubicle({ roomNumber: '', floor: '' });
    } catch (error) {
      console.error('Error saving cubicle:', error);
      alert('Failed to save cubicle.');
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
export default CubicleCreate;

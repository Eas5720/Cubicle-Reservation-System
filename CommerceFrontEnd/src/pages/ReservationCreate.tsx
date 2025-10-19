import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function ReservationCreate() {
  const [book, setBook] = useState({
    author: '',
    title: ''
  }); //creates variables to store


  const changeValue=(e)=>{
    console.log(e);
    setBook({
     ...book, [e.target.name]:e.target.value  
    });
    console.log(e.target.name + " name "  );
    console.log(e.target.value + " value " );
  }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  
    try {
      const response = await axios.post('/api/books', book);
      console.log('Book saved:', response.data);
      alert('Book saved successfully!');
      setBook({ author: '', title: '' });
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Failed to save book.');
    }
  };

  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="input" placeholder="name" name = "author" onChange={changeValue}/> 
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Cubical ID</Form.Label>
                <Form.Control type="input" placeholder="cubical id" name = "title" onChange={changeValue}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
  );
}
export default ReservationCreate;

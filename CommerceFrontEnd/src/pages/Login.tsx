import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: ''
  }); //creates variables to store


  const changeValue=(e)=>{
    console.log(e);
    setLogin({
     ...login, [e.target.name]:e.target.value  
    });
    //console.log(e.target.name + " name "  );
    //console.log(e.target.value + " value " );
  }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  
    try {
      const response = await axios.post('/api/login', login);
      if (response.data.id == null){
        console.log('Login attempt:', response.data);
        alert('Username or Password incorrect');
      }
      else{
        console.log('Login attempt:', response.data);
        alert('Login successfully!');
        localStorage.setItem("employeeID", response.data.id);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        //setLogin({ email: '', password: '' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to log in.');
    }
  };

  const [employeeID, setEmployeeID] = useState({
    id: localStorage.getItem("employeeID"),
  });


  return (
    <div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="input" placeholder="email@place.com" name = "email" onChange={changeValue}/> 
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control type="input" placeholder="password" name = "password" onChange={changeValue}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        <p>{employeeID.id}</p>
    </div>
  );
}
export default Login;
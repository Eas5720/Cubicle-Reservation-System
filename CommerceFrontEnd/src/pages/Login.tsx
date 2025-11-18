import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { employeeID, isAdmin, handleLogin } = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: '',
    password: ''
  }); //creates variables to store

  // Redirect if already logged in
  useEffect(() => {
    if (employeeID) {
      navigate("/home", { replace: true });
      if(isAdmin==true){
          navigate('/adminhome');
      }
      else{
          navigate('/home');
      }
    }
  }, [employeeID, navigate]);

  const changeValue=(e: { target: { name: any; value: any; }; })=>{
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
      const response = await axios.post("/api/employee/login", login);

      if (response.data.id == null) {
        //TODO: Make this be part of the thing and not just front end
        alert("Username or password incorrect");
        return;
      }

      // Update context
      //localStorage.setItem("employeeID", response.data.id);
      //localStorage.setItem("isAdmin", response.data.admin);

      handleLogin(response.data.id, response.data.admin);

      if(response.data.admin){
        navigate('/adminhome', { replace: true });
      }else{
        navigate('/home', { replace: true });
      }
      setLogin({ email: '', password: '' });
    } catch (error) {
      alert("Failed to log in.");
    }
  };

  return (
    <div>
      <TopNav />
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="input" placeholder="email@place.com" name="email" onChange={changeValue} />

        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password" name="password" onChange={changeValue} />

        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;

/*function Login() {
  const employeeID = getCurrentEmployeeID();
  const isAdmin = getIsAdmin();
  //const {employeeID, handleLogin} = useAuth();

  const navigate = useNavigate();

  useEffect(()=>{
    if(employeeID != null){
      if(isAdmin==true){
          navigate('/adminhome');
      }
      else{
          navigate('/home');
      }
    }
  }, [])
  const [login, setLogin] = useState({
    email: '',
    password: ''
  }); //creates variables to store

  

  const changeValue=(e: { target: { name: any; value: any; }; })=>{
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
      const response = await axios.post('/api/employee/login', login);
      if (response.data.id == null){
        //TODO: Make this be part of the thing and not just front end
        alert('Username or Password incorrect');
      }
      else{
        localStorage.setItem("employeeID", response.data.id);
        localStorage.setItem("isAdmin", response.data.admin);
        if(response.data.admin){
          navigate('/adminhome');
        }else{
          navigate('/home');
        }
        setLogin({ email: '', password: '' });
        //handleLogin(response.data.id);
      }
    } catch (error) {
      alert('Failed to log in.');
    }
  };

  return (
    <div>
      <TopNav/>
        <h1>Login</h1>
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
    </div>
  );
}
export default Login;*/
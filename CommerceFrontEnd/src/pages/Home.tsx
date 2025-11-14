import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate('/reservationcreate');
  }
  return (
    <div>
        <Button onClick={handleClick}>Create Reservation</Button>
    </div>
  );
}
export default Home;

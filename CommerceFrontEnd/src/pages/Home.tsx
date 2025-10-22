import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [iaAdmin] = useState(
      localStorage.getItem("isAdmin")
  );
  const navigate = useNavigate();

  useEffect(()=>{
    if(iaAdmin){
        navigate('/adminhome');
    }
    else{
        navigate('/home');
    }
  }, [])
  return (
    <div>
        <p>Home</p>
    </div>
  );
}
export default Home;

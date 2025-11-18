import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function getEmployee(){
    const { employeeID } = useAuth();
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: ''
    });
    useEffect(() => {
        axios
        .get(`/api/employees/${employeeID}`)
        .then((res) => setEmployee(res.data))
        .catch((err) => console.log(err));
    }, [employeeID]);
    return employee;
}export default getEmployee
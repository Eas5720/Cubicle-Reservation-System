import type { JSX } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ConfirmLoginProps{
    children: JSX.Element;
    adminOnly?: boolean;
    nonAdminOnly?: boolean;
}
function ConfirmLogin({children, adminOnly = false, nonAdminOnly = false}: ConfirmLoginProps){
    const {employeeID, isAdmin} = useAuth();
    if (employeeID == null){
        return <Navigate to="/login" replace/>;
    }
    else if(adminOnly && !isAdmin){
        return <Navigate to="/home" replace/>;
    }
    else if(nonAdminOnly && isAdmin){
        return <Navigate to="/adminhome" replace/>
    }

    return children;
}
export default ConfirmLogin;
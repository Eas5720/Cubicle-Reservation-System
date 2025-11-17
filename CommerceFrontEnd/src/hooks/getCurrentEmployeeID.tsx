import { useState } from "react";
export default function getCurrentEmployeeID(){
  const [employeeIDString] = useState(
    localStorage.getItem("employeeID")
  );
  let employeeID = 0;
  if (employeeIDString!==null){
    employeeID = parseInt(employeeIDString);
  }
  return employeeID;
}
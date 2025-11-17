import { useState } from "react";

export default function getIsAdmin(){
  const [isAdminString] = useState(
    localStorage.getItem("employeeID")
  );
  let isAdmin = false;
  if (isAdminString!==null){
    isAdmin = JSON.parse(isAdminString);
  }
  return isAdmin;
}
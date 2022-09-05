import React, { useState, useEffect } from 'react';
import { Route, Navigate, useNavigate, useLocation } from "react-router-dom";
const AuthRequire = ({ element: Component}:any) => {

  const [isAuthenticated, setIsAuthenticated] = useState("");
  const navigate = useNavigate();
  const state = useLocation();
  let token:any = localStorage.getItem("token") && localStorage.getItem("token");
  useEffect(() => {
    if(localStorage.getItem("token"))
    if(token){
     setIsAuthenticated(token)
     console.log("token check")
    }
  },[])
  
  return (
            !isAuthenticated ? (
            <Navigate to={`/login?last_login=`+state.pathname}/>
            ): (
                    <Component />
            )
  );
};
export default AuthRequire;
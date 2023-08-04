// eslint-disable-next-line
import React, { useEffect } from "react";
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router";
function ProtectedRoute({ChildComponent}){
    const isAuthenticated=useSelector((state)=>state.Auth.isAuthenticated);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!isAuthenticated)
            navigate('/')
    },[isAuthenticated,navigate])
    if(isAuthenticated)
        return ChildComponent;
}

export default ProtectedRoute;
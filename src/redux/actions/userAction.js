import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer,toast } from 'react-toastify';


import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../constants/userConstant";

export const login = (email, password) => async (dispatch) => {
  
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "http://localhost:5000/api/user/login",
      {
        email,
        password,
      },
      {
        method: "POST",
        withCredentials: true,
      },
      config
    );

    console.log(data.success)
    if(data.success===true){
        localStorage.setItem("Token",data.token)
        localStorage.setItem("User",JSON.stringify(data.user))
        localStorage.setItem("role",JSON.stringify(data.user.role))

    }else{
      toast.error(data.message)
    }


    const user=localStorage.getItem("User")
    
    console.log(user)
    
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    console.log(error)
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
  // return(
  //   <>
  //   <ToastContainer/>
  //   </>
  // )
};

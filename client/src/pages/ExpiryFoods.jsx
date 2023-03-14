import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import io from "socket.io-client"
import { productionAPIURL } from "../../config/config.json"
import axios from "axios"

const socket = io(productionAPIURL)

export default function ExpiryFoods(){
    const navigate = useNavigate();
    useEffect(() => {
        // if (cookies.jwt) {
        //   navigate("/dashboard");
        // }
        const verifyUser = async() => {
          const { data } = await axios.post(productionAPIURL, {
            token: localStorage.getItem("token")
          })
    
          if(data.status == false){
            navigate('/login')
          }

          
        }
    
        verifyUser()
      // }, [cookies, navigate]);
      },[])

      return (
        <>
        <h1>Hello world</h1></>
      )
}

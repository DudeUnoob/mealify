
import React, { useState, useEffect } from 'react';
import { Card } from "react-bootstrap"
import { Link } from 'react-router-dom';
import "../public/css/Home.css"
import { productionAPIURL } from "../../config/config.json"


export default function Home(){

    return (
       
            <>
            <div className="text-center">
                <h2>Welcome to Mealify</h2>
                <p><i>Make cooking your place</i></p>
                <Link to={"/register"}>Sign Up</Link> or <Link to={"/login"}>Login</Link>
                
                
            </div>
            </>
       
    )
}
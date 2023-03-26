
import React, { useState, useEffect } from 'react';
import { Card, Image, Figure } from "react-bootstrap"
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
            <div className="created-by text-center" >
            <Figure>
                <Link to="https://github.com/DudeUnoob" target={"_blank"}>
      <Figure.Image
      className='creator-imgs'
        width={190}
        height={200}
        alt="171x180"
        roundedCircle
        src="https://media.discordapp.net/attachments/953660750285664330/1089621273908367511/profile-pic_2.png?width=567&height=567"
        
      />
      </Link>
      <Link to={"https://www.instagram.com/perfectanglephotos/"} target={'_blank'}>
      <Figure.Image className='creator-imgs' width={190} height={200}  id="ethan_img"  alt="ethan-creator" src="https://media.discordapp.net/attachments/953660750285664330/1089621173496725646/image0.jpg?width=438&height=567"/>

      </Link>
      <Figure.Caption>
        Created by Dom and Ethan
      </Figure.Caption>
    </Figure>

    <p><i>This application is still in development!</i></p>
            </div>
            </>
       
    )
}
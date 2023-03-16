import React, { useState, useEffect } from 'react';
import { useNavigate, Link, } from 'react-router-dom';
import { Form, Button, Card } from "react-bootstrap"
import io from "socket.io-client"
import { productionAPIURL } from "../../config/config.json"
import axios from "axios"
import socket from '../functions/websocketInstance';
import { onLocalStorageChange } from '../functions/onLocalStorageChange';
import { getMeals } from '../microservices/getMeals';
import { addMeal } from '../microservices/addMeal';

export default function ExpiryFoods(){
  const [image, setImage] = useState(null)
  const [meals, setMeals] = useState([])
  const [customValue, setCustomValue] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)

    const navigate = useNavigate();
    useEffect(() => {
        // if (cookies.jwt) {
        //   navigate("/dashboard");
        // }
        onLocalStorageChange()
        const verifyUser = async() => {
          const { data } = await axios.post(productionAPIURL, {
            token: localStorage.getItem("token")
          })
    
          if(data.status == false){
            navigate('/login')
          }

          // socket.emit("get_user", localStorage.getItem("token"))
          // socket.on("get_user_response", data => {
          //   console.log(data)
          // })
          
        }
    
        verifyUser()
      // }, [cookies, navigate]);

      // async function callGetUserMeals(){
      //   const data = await getMeals()
      //   setMeals(data.meals)

      // }

      // callGetUserMeals()
      },[])


      function handleFileUpload(event) {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          setImage(reader.result)
        }
      }

      function handleSelectChange(event) {
        if(event.target.value === 'custom'){
          setShowCustomInput(true)
        } else {
          setShowCustomInput(false)
          setCustomValue(event.target.value)
        }
      }

      async function handleSubmt(event) {
        event.preventDefault()
        const mealTitle = document.getElementById("mealTitle").value 

        const newMeal = { mealTitle: mealTitle, mealPicture: image, expiryDate: customValue, completed: true }
        //setMeals([...meals, newMeal])
        event.target.reset()
        
        addMeal(newMeal)

      }
      return (
        <>
          <div className="container" style={{ width:"400px", margin:"0 auto"}}>
            <Form onSubmit={handleSubmt}>
            <Form.Group className='form-container-title' >
                <Form.Label>Enter your new meal name!</Form.Label>
                <Form.Control type='text' id="mealTitle" placeholder='meal name ex: pizza' name="mealTitle" required />
            </Form.Group>
            <br />
            <Form.Group className='dropdown'>
              <Form.Label>Select when your food expires</Form.Label>
              <Form.Select onChange={handleSelectChange}>
                <option>None</option>
                <option value="60000">1 minute</option>
                <option value="604800000">1 week</option>
                <option value="1209600000">2 weeks</option>
                <option value="2592000000">1 month</option>
                <option value="15811200000">6 months</option>
                <option value="31556926000">1 year</option>
                <option value="63113852000">2 years</option>
                {/* <option value="custom">Custom</option> */}
              </Form.Select>
            </Form.Group>
            <br />
            {showCustomInput && (
              <div>
                <Form.Label>Enter a custom expiry date value:</Form.Label>
                <Form.Control type="text" id="custom-value" value={customValue} onChange={(event) => setCustomValue(event.target.value)} />
              </div>
            )}
            <br />
            <Form.Group className='form-container-file'>
                <Form.Label>Add a picture for your meal!</Form.Label>
                <Form.Control type='file' name='mealPicture' required onChange={handleFileUpload} accept="image/*" />
            </Form.Group>
            <br />
            <Button type='submit' style={{width:"100%"}}>Submit</Button>
            {image && <img src={image} alt="Uploaded image" style={{ width: "100%", height: "auto"}} />}
            </Form>
          </div>
        </>
      )
}

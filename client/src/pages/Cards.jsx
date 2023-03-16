import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {  productionAPIURL } from "../../config/config.json"
import "../public/css/Cards.css"
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { addIngredient } from "../microservices/addIngredient";
import { getIngredients } from "../microservices/getIngredients";
import { createApi } from "unsplash-js"
import { onLocalStorageChange } from "../functions/onLocalStorageChange";

const unsplash = createApi({
  accessKey:"67QcAN0o9CgC2ol5SgUn8iic4rL1QcFFoAOUTZO95EY",
 
})

export default function Cards() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [imagesArray, setImagesArray] = useState([])
  const ingredientInput = useRef(null)
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
     const todoText = e.target.elements.todoText.value;
    //const todoText = ingredientInput.current.value
    unsplash.search.getPhotos({ query: todoText, page: 1, perPage: 1}).then(res => {
      const newTodo = { text: todoText, image: res.response.results[0].urls.raw, completed: false };
      setTodos([...todos, newTodo]);
      e.target.reset();
    //ingredientInput.current.value = ""
    addIngredient([...todos, newTodo])
    })
    
    
   
    
     

  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
   
    addIngredient(updatedTodos)
  };

  useEffect(() => {
    const verifyUser = async () => {
      // if (!cookies.jwt) {
      //   navigate("/login");
      // } else {
        const { data } = await axios.post(
          productionAPIURL,
          { token: localStorage.getItem("token") },
          {
            // withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else{
          toast(`Hi ${data.username} 👩‍🍳`, {
            theme: "dark",
          });
          
        }
          
      }
  //}
    verifyUser();
  }, [])
  // }, [cookies, navigate, removeCookie]);
  let imgUrl;
  useEffect(() => {
    onLocalStorageChange()
    async function callGetUserIngredients(){
      const data = await getIngredients()
      let images = []
      
      
      
      setTodos(data.ingredients)
    }

    callGetUserIngredients()
  },[])

  const logOut = () => {
    localStorage.clear()
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
      <div className="text-center">
        <h1>Dashboard</h1>
        <Button onClick={logOut}>Log Out</Button>
      </div>
      <ToastContainer />

<br />
<br />
      <div className="ingredientListForm">
      <h1 style={{textAlign:"center"}}>Ingredient List</h1>
      <form onSubmit={handleSubmit} id="listForm">
        <label>
          <input type="text" id="list-item" placeholder="Add an Ingredient" name="todoText" required />
          {/* <Form.Control type="text" id="list-item" name="todoText" required /> */}
        </label>
        <button type="submit" id="add-button">Add</button>
      </form>
      <ul id="list">
       
        {todos.map((todo, index) => {
          
          return (
            <li key={index}>
            
            {todo.text}
            <img src={todo.image}/>
            <button onClick={() => handleDelete(index)} variant="danger" id="delete-btn">Delete</button>
          </li>
          )

         
})}
        
      </ul>

      {/* <Form style={{ width:"400px", margin:"0 auto"}} onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label htmlFor="inlineFormInput" ref={ingredientInput}  visuallyHidden>
              Add Ingredient
            </Form.Label>
            <Form.Control className="mb-2" id="inlineFormInput" placeholder="Add Ingredient"/>
          </Col>
          <Col xs="auto">
          <Button type="submit" className="mb-2">
            Submit
          </Button>
        </Col>
        </Row>
      </Form> */}
    </div>
    </>
  );
}

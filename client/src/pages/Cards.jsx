import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {  productionAPIURL } from "../../config/config.json"
import "../public/css/Cards.css"
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { addIngredient } from "../microservices/addIngredient";
import { getIngredients } from "../microservices/getIngredients";
axios.defaults.withCredentials = true

export default function Cards() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const ingredientInput = useRef(null)

  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
     const todoText = e.target.elements.todoText.value;
    //const todoText = ingredientInput.current.value
    const newTodo = { text: todoText, completed: false };
    setTodos([...todos, newTodo]);
    localStorage.setItem("ingredient-list", JSON.stringify([...todos, newTodo]))
     e.target.reset();
    //ingredientInput.current.value = ""
    addIngredient([...todos, newTodo])
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
    localStorage.setItem("ingredient-list", JSON.stringify(updatedTodos))
    addIngredient(updatedTodos)
  };

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          productionAPIURL,
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else{
          toast(`Hi ${data.user} 👩‍🍳`, {
            theme: "dark",
          });
          
        }
          
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    async function callGetUserIngredients(){
      const data = await getIngredients()
      console.log(data)
      setTodos(data.ingredients)
    }

    callGetUserIngredients()
  },[])

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
      <div className="text-center">
        <h1>Super Secret Page</h1>
        <Button onClick={logOut}>Log Out</Button>
      </div>
      <ToastContainer />

<br />
<br />
      <div className="ingredientListForm">
      <h1 style={{textAlign:"center"}}>Ingredient List</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Add Ingredient:
          <input type="text" name="todoText" required />
        </label>
        <button type="submit">Add</button>
      </form>
      <ul>
       
        {todos.map((todo, index) => (
          <li key={index}>
            
            {todo.text}
            <Button onClick={() => handleDelete(index)} variant="danger">Delete</Button>
          </li>
        ))}
        
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

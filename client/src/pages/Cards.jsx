import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {  productionAPIURL } from "../../config/config.json"
import "../public/css/Cards.css"
import { Button, Card } from "react-bootstrap";
import { addIngredient } from "../microservices/addIngredient";

export default function Cards() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoText = e.target.elements.todoText.value;
    const newTodo = { text: todoText, completed: false };
    setTodos([...todos, newTodo]);
    localStorage.setItem("ingredient-list", JSON.stringify([...todos, newTodo]))
    e.target.reset();
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
        } else
          toast(`Hi ${data.user} 👩‍🍳`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

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

      <div>
      <h1>Ingredient List</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Add Ingredient:
          <input type="text" name="todoText" required />
        </label>
        <button type="submit">Add</button>
      </form>
      <ul>
       
        {/* {todos.map((todo, index) => (
          <li key={index}>
            
            {todo.text}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))} */}
        {JSON.parse(localStorage.getItem("ingredient-list")).map((elm ,i) => {
          return (
            <li key={i}>
              {elm.text}
              <Button variant="danger" onClick={() => handleDelete(i)}>Delete</Button>
            </li>
          )
        })}
      </ul>
    </div>
    </>
  );
}

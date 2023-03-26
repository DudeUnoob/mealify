import React, { useEffect } from "react";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Cards from "./pages/Cards";

import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/NavigationBar";
import { onLocalStorageChange } from "./functions/onLocalStorageChange";
import Home from "./pages/Home";
import ExpiryFoods from "./pages/ExpiryFoods";
import { UserProvider } from "./context/UserContext";
import ExpiryFoodsView from "./pages/ExpiryFoodsView";
import registerServiceWorker from "./microservices/workers/registerServiceWorker";
import socket from "./functions/websocketInstance";
import { subscribeUser } from "./components/Notifications";
export default function App() {

  useEffect(() => {
    onLocalStorageChange()
    registerServiceWorker()

    socket.on("realtimeUpdate", data => {
      subscribeUser()
    })
    
  }, [])

  return (
    <BrowserRouter>
    <UserProvider>
    <NavigationBar />

      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        {/* <Route exact path="/login" element={<Cards />}/> */}
        <Route exact path="/dashboard" element={<Cards />} />
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/expiry/foods" element={<ExpiryFoods />}/>
        <Route exact path="/expiry/foods/view" element={<ExpiryFoodsView />}/>
      </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

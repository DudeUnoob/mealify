import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { productionAPIURL } from "../../config/config.json"

import axios from "axios"

const withAuth = (Component) => {
    const [authenticated, setAuthenticated] = useState(false)
    

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
            setAuthenticated(data)
            return Component
          }
            
         
        }
    //}
    return verifyUser()
}

export default withAuth
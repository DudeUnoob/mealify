import React, { useState, useEffect, useContext, createContext } from 'react';
import socket from '../functions/websocketInstance';


export const UserContext = createContext()

export function UserProvider({ children }){

    const [user, setUser] = useState(null)

    useEffect(() => {
         socket.emit("get_user", localStorage.getItem("token"))
          socket.on("get_user_response", data => {
             setUser(data)
             console.log(data)
           })
    }, [])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}
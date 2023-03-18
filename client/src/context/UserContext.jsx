import React, { useState, useEffect, useContext, createContext } from 'react';
import socket from '../functions/websocketInstance';


export const UserContext = createContext()

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        //setInterval(() => {
        socket.emit("get_user", localStorage.getItem("token"))
        socket.on("get_user_response", data => {
            setUser(data)
        })
        socket.on("reset_token", (data) => {
            localStorage.clear()
        })
        //}, 3000)

        // setInterval(() => {
        //     socket.emit("get_realtime_user", localStorage.getItem("token"))

        //     socket.on("realtime_user_response", data => {
        //         setUser(data)
        //     })
        // }, 3000)

        socket.on("realtimeUpdate", data => {
            setUser(data)
        })

    }, [])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}
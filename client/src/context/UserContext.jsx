import React, { useState, useEffect, useContext, createContext } from 'react';
import socket from '../functions/websocketInstance';


export const UserContext = createContext()

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {
    
    const [user, setUser] = useState(null)
    //const [notifications, setNotifications] = useState()
    const [pushEnabled, setPushEnabled] = useState(false)

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
        //     socket.emit("get_user", localStorage.getItem("token"))
        // }, 3000)
        // setInterval(() => {
        //     socket.emit("get_realtime_user", localStorage.getItem("token"))

        //     socket.on("realtime_user_response", data => {
        //         setUser(data)
        //     })
        // }, 3000)
        
        socket.on("realtimeUpdate", data => {
            
            const notis = JSON.parse(localStorage.getItem("notifications"))
            if(!localStorage.getItem("notifications")){
                console.log(data)
                setUser(data)
                localStorage.setItem("notifications", JSON.stringify([data.updatedMeal]))
                
            } else {
                setUser(data)
                const notis = JSON.parse(localStorage.getItem("notifications"))
                localStorage.setItem("notifications", JSON.stringify([...notis, data.updatedMeal]))
                
            }
            

            new Notification("Mealify", {
                body:`Your ${data.updatedMeal.meals.mealTitle} meal has expired!`
            })
            
            // setNotifications([...notifications, data.updatedMeal])
            
        })

    }, [])

    

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}
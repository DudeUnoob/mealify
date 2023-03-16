import axios from "axios"
import { productionAPIURL } from "../../config/config.json"
axios.defaults.withCredentials = true
export const addMeal = async(meal) => {

    const { data } = await axios.post(`${productionAPIURL}/user/new-meal`, { meal: meal, token: localStorage.getItem("token") }, {
        withCredentials: true
    })
    
    console.log(data)
    return data
}
import axios from "axios"
import { productionAPIURL } from "../../config/config.json"
axios.defaults.withCredentials = true
export const addIngredient = async(ingredients) => {

    const { data } = await axios.post(`${productionAPIURL}/user/ingredients`, { ingredients: ingredients, token: localStorage.getItem("token") }, {
        withCredentials: true
    })
    
    console.log(data)
    return data
}
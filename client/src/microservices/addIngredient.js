import axios from "axios"
import { productionAPIURL } from "../../config/config.json"
axios.defaults.withCredentials = true
export const addIngredient = async(ingredients) => {

    const { data } = await axios.post(`${productionAPIURL}/user/ingredients`, { ingredients: ingredients }, {
        withCredentials: true
    })
    
    console.log(data)
    return data
}
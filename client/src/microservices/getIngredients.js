import axios from "axios"
import { productionAPIURL } from "../../config/config.json"
axios.defaults.withCredentials = true
export const getIngredients = async() => {
    
    const { data } = await axios.post(`${productionAPIURL}/user/get-ingredients`, { token: localStorage.getItem("token") })

    return data
}
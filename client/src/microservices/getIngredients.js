import axios from "axios"
import { productionAPIURL } from "../../config/config.json"
axios.defaults.withCredentials = true
export const getIngredients = async() => {
    
    const { data } = await axios.get(`${productionAPIURL}/user/get-ingredients`, { withCredentials: true })

    return data
}
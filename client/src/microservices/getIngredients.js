import axios from "axios"
import { productionAPIURL } from "../../config/config.json"

export const getIngredients = async() => {
    
    const { data } = await axios.get(`${productionAPIURL}/user/get-ingredients`, { withCredentials: true })

    return data
}
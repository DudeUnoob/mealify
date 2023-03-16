import axios from "axios"
import { productionAPIURL } from "../../config/config.json"
axios.defaults.withCredentials = true
export const getMeals = async() => {
    

    
        const { data } = await axios.post(`${productionAPIURL}/user/get-meals`, { token: localStorage.getItem("token") })
        
    return data
    

}
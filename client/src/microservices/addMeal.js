import axios from "axios"
import { productionAPIURL } from "../../config/config.json"
axios.defaults.withCredentials = true
export const addMeal = async(meal) => {

    // const { data } = await 
    
    // return data

    try {
        const response = await axios.post(`${productionAPIURL}/user/new-meal`, { meal: meal, token: localStorage.getItem("token") }, {
                withCredentials: true
             });
       // console.log(response.data);

        return response.data
      } catch (error) {
        if (error.response) {
          //console.log(error.response.data);
          //console.log(error.response.status);
          //console.log(error.response.headers);
          //localStorage.clear()
          return error.response
        } else if (error.request) {

          //console.log(error.request);
          return error.request
        } else {
          //console.log('Error', error.message);
          return error.message
        }
      }
      
}
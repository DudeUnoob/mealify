import io from "socket.io-client"
import { productionAPIURL } from "../../config/config.json"

const socket = io(productionAPIURL)

export default socket;
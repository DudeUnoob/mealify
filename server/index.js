const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const User = require("./model/authModel")
const MealSchema = require("./model/mealModel")
const app = express();
const { mongodbConnectionString } = require("./config/config.json")
app.use(express.json({limit: "5mb"}))
app.use(express.urlencoded({ extended: true, limit: "5mb" }))
const webpush = require("web-push")

//Public Key:
//const publicVapidKey = "BC0yKrpzC_cAu9THj0R3K-MWhMouMdsTCmXzZUiA6uf2rKtBtt_vIXjPF5w66NC2Idh-CavtRkczWTA5T9B8NtA"
const publicVapidKey = "BERUJMe1npcebsZ41if7t38zwRlFOvVI-aMjTmaqALo6oTeyTxibVGosy1W40hhi9WOJZ3TYfTuS4-gmElYCPuI"
const privateVapidKey = "kEaMWM21eNGv9TFEYDGwAmrd72yz2RmdCa_qyYZGBEs"
//Private Key:
//const privateVapidKey = "bLJSp6r9aULPvRtWmb9UzbNfAm7y4TGoOldrlO3kDVY"

const vapidKeys = {
  publicKey: publicVapidKey,
  privateKey: privateVapidKey
}

webpush.setVapidDetails("mailto:test@test.com", vapidKeys.publicKey, vapidKeys.privateKey)



const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io");
const workerInstance = require("./microservices/workers/workerInstance");
const io = new Server(server, {
  cors:{
    origin:["http://localhost:5173", "https://mealify.vercel.app"],
    methods: ["GET", "POST"]
  }
})

var socketInstance1 = require("./microservices/workers/workerInstance")(io)

io.on("connection", (socket) => {

  socket.on("get_user", async data => {
    try {
      const decode = jwt.verify(data, "mealifyauth")
      const { email, username } = await User.findById(decode.id)
      const mealQuery = await MealSchema.find({ email: email })
      socket.uuid = decode.id
      socket.emit("get_user_response", { email: email, username: username, uuid: socket.uuid, meals: mealQuery })
    } catch (e) {
      socket.emit("reset_token", "token_reset")
    }
    
  })

  // socket.on("get_realtime_user", async data => {
  //   try{
  //     const decode = jwt.verify(data, "mealifyauth")
  //     const { email, username } = await User.findById(decode.id)
  //     const mealQuery = await MealSchema.find({ email: email })
  //     socket.uuid = decode.id
  //     socket.emit("realtime_user_response", { email: email, username: username, uuid: socket.uuid, meals: mealQuery })
  //   } catch(e){
  //     socket.emit("reset_token", "token_reset")
  //   }
  // })
})

server.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});

mongoose
  .connect(mongodbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://mealify.vercel.app"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use("/", authRoutes);
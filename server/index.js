const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
  cors:{
    origin:["http://localhost:5173", "https://mealify.vercel.app"],
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log("A socket connected with id", socket.id)
})


server.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});

mongoose
  .connect("mongodb+srv://ZeroX:Balaram26@cluster0.b2lzi.mongodb.net/?retryWrites=true&w=majority", {
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

const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const User = require("./src/Models/User")
const { register, login } = require("./src/Controllers/Users")
const { admin } = require("./src/Controllers/Admin/Users")
const { isValidated, validateRequest, validateLoginRequest } = require("./src/Middlewares")
const categoryRoutes = require('./src/Routes/Category');


const app = express()



app.use(express.json())

app.get("/", (req, res) => {
  res.status(200).json({
      uname: "Raushni",
      uphone: "00000000"

  })
})

//app.use("/api",userRoutes);

app.post("/register",validateRequest,isValidated ,register)
app.post("/login",validateLoginRequest,isValidated, login)
app.post("/admin/register",validateRequest,isValidated, register)
app.post("/admin/login", validateLoginRequest,isValidated,login)





app.use("/api",categoryRoutes);



app.listen(process.env.PORT, () => {
    console.log("Server Started");
  })
  const mongodb =process.env.MONGODB_url
  mongoose.connect(`mongodb+srv://${process.env.MONGOURL}:${process.env.MONGOPASS}@cluster0.ahbd6j6.mongodb.net/?retryWrites=true&w=majority`)
    .then(data => console.log("Database Connected"))
    .catch(error => console.log(error))
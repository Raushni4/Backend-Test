const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const User = require("./src/Models/User")
const { register, login } = require("./src/Controllers/Users")
const { admin } = require("./src/Controllers/Admin/Users")
const { isValidated, validateRequest, validateLoginRequest } = require("./src/Middlewares")
const Category = require("./src/Models/Category")
const { addCategory, findCategory } = require("./src/Controllers/Category")
//const { addCategory } = require("./src/Controllers/Category")

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
app.post("/category/create",Category)
app.post("/addCategory",addCategory)

app.get("/get-category",findCategory)






app.listen(process.env.PORT, () => {
    console.log("Server Started");
  })
  const mongodb =process.env.MONGODB_url
  mongoose.connect(mongodb)
    .then(data => console.log("Database Connected"))
    .catch(error => console.log(error))
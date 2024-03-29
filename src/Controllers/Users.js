const User = require("../Models/User")
const jwt = require("jsonwebtoken")

exports.register = async (req, res, next) => {


  const { name, phone, email, password } = req.body

  const _user = new User({
    name, email, phone, password, role:"user"
  });
  console.log(password)

  const eUser = await User.findOne({ email })

  if (!eUser) {
    _user.save().then(newUser => {
      res.status(201).json(newUser);

    })
     .catch(error => {
       res.status(400).json({ message: "Error occured", error })
     })
  } else {
    res
      .status(400).json({
        message: "User Already Exist"
      })
  }
}
exports.login = async (req, res) => {
  const { email, password } = req.body

  const eUser = await User.findOne({ email })

  if (eUser) {

    if (eUser.authenticate(password)) {
      const token = jwt.sign({
        id: eUser._id
      }, "MyAPPSECRET", {
        expiresIn: "24h"
      })
      return res.status(200).json({ message: "Login Successful", token, isSuccess: true })

    } else {
      return res.status(401).json({ message: "You Are Not Logged In" })
    }

  } else {
    return res.status(404).json({ message: "User Not Found Please Signup" })
  }

}
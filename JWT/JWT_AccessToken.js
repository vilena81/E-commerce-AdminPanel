const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET= process.env.SECRET;


exports.generateAccessToken = (email,role)=>{
    return jwt.sign({email, role}, SECRET, { expiresIn: "36000s" })
}
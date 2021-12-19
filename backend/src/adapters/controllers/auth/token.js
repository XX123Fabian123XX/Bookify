const jwt = require("jsonwebtoken")
const path = require("path")
const dotenv = require("dotenv")
dotenv.config({path:path.join(__dirname, "../../../../.env")})

exports.getJsonWebToken = async (payload) => {
    payload = {...payload, exp:Math.floor(Date.now() / 1000) + parseInt(process.env.ACCESS_TOKEN_EXPIRATION), iat: Math.floor(Date.now() / 1000)} 
    console.log(payload)
    return new Promise((resolve,reject) => {
        return  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
            if (err) {
                reject(err)
            }
            resolve(token)
        })
    }) 
}

exports.verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
            if (err) reject(err)
            resolve(decoded)
        })
    })
}
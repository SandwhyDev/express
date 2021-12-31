const jwt = require("jsonwebtoken")
require("dotenv").config()

//buat signJwt function
const signJwt = (payload)=>{
    return jwt.sign(payload, process.env.SECRET_KEY)
}

//middleware
const verifyJwt = async(req,res,next)=>{
    try {
        //buat bearer
        let auth_header = await req.headers["authorization"]

        //jika token tidak ada
        if(!auth_header){
            res.json({
                success : false,
                msg : "authorizationnya ga ada boss, lau sokap ?"
            })
            return
        }

        let token = await auth_header.split(" ")[1]
        let checkToken = await jwt.verify(token, process.env.SECRET_KEY)

        // jika malformat
        if(!checkToken){
            res.json({
                success : false,
                msg : "jwt tidak ada"
            })
            return
        }

        next()
        
    } catch (error) {
        res.json({
            success : false,
            msg : "jwt tidak ada"
        })
    }
}

module.exports = {signJwt, verifyJwt}
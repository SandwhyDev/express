const express = require("express")
const path = require("path")
const fs = require("fs")
const { users } = require("../prisma/connection")
const upload_avatar = require("../services/avatar_multer")
const { hash_password, compare_password } = require("../services/hashing")
const form_data = require("../services/form_data")
const { signJwt, verifyJwt } = require("../services/jwt")


const user = express.Router()


user.post("/user_create", upload_avatar.single("avatar"),async(req,res)=>{
    try {
        const data = await req.body
        const file = await req.file
        const result = await users.create({
            data : {
                email : data.email,
                password : hash_password(data.password),
                avatar : {
                    create : {
                        filename : file.filename,
                        image_path : path.join(__dirname, `../static/uploads/avatar/${file.filename}`)
                    }
                }
            },
            
        })

        if(!result){
            res.json({
                success : false,
                msg : "email sudah terdaftar",

            })
            return
        }

        res.json({
            success : true,
            msg : "berhasil buat user",
            query : result
        })


    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

user.post("/user_login", form_data.none(), async(req,res)=>{
    try {
        const data = await req.body
        const result = await users.findUnique({
            where : {
                email : data.email
            }
        })
        if(!result){
            res.json({
                success : false,
                msg : "email salah"
            })
            return
        }

        const cekPassword = await compare_password(data.password, result.password)

        if(!cekPassword){
            res.json({
                success : false,
                msg : "password salah"
            })
            return
        }

        res.json({
            success : true,
            msg : "berhasil login",
            token : signJwt({
                ...result,
                password : "********"
            })
        })

    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

user.get("/user_read",verifyJwt ,async(req,res)=>{
    try {
        let ts = Date.now();

        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minute = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();

        
        
        const result = await users.findMany({
            include : {
                avatar : false,
                biodata : true
            }
        })
        
        
        res.json({
            success : true,
            query : result,
            waktu : + hours + ":" + minute + ":" + seconds + " " + year + "-" + month + "-" + date  
        })

    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

user.put("/user_update/:id", verifyJwt,form_data.none(), async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const findUser = await users.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!findUser){
            res.json({
                success : false,
                msg : "data tidak ditemukan"
            })

            return
        }

        const result = await users.update({
            where : {
                id : parseInt(id)
            },
            data : {
                password : hash_password(data.password)
            }
        })

        res.json({
            success : true,
            msg : "berhasil update user",
            query : result
        })


    } catch (error) {
        res.json({
            success : false,
            msg : "data tidak ditemukan"
        })
    }
})

user.delete("/user_delete/:id", async(req,res)=>{
    try {

        const {id} = await req.params
        // const data = await req.body
        const findUser = await users.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!findUser){
            res.json({
                success : false,
                msg : "data tidak ditemukan"
            })

            return
        }

        const result = await users.delete({
            where : {
                id : parseInt(id)
            },
            include : {
                avatar : true
            }
        })

        const delete_img = await fs.unlinkSync(path.join(__dirname, `../static/uploads/avatar/${result.avatar.filename}`))

        res.json({
            success : true,
            msg : "berhasil delete user",
            query : result
        })


    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

module.exports = user
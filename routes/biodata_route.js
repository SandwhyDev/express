const express = require("express")
const ps = require("../prisma/connection")
const form_data = require("../services/form_data")

const biodata = express.Router()

biodata.post("/biodata_create", form_data.none(),async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.biodata.create({
            data : {
                nama_lengkap : data.nama_lengkap,
                alamat : data.alamat,
                phone : parseInt(data.phone),
                ttl : data.ttl,
                jenis_kelamin : data.jenis_kelamin,
                user_id : parseInt(data.user_id)
            }
        })
        res.json({
            success : true,
            msg : `berhasil buat user biodata`,
            query : result
        })

    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

biodata.put("/biodata_update/:id", form_data.none(), async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const findUser = await ps.biodata.findUnique({
            where : {
                id : parseInt(id)
            }
        })

        if(!findUser){
            res.json({
                success : false,
                msg : "data tidak ditemukan"
            })
        }

        const result = await ps.biodata.update({
            where : {
                id : parseInt(id)
            },
            data : {
                nama_lengkap : data.nama_lengkap,
                alamat : data.alamat,
                phone : parseInt(data.phone),
                ttl : data.ttl,
                jenis_kelamin : data.jenis_kelamin,
                user_id : parseInt(data.user_id)
            }
        })

        res.json({
            success : true,
            msg : `berhasil UPDATE biodata`,
            query : result
        })

    } catch (error) {
        res.json({
            success : false,
            msg : "data tidak ditemukan"
        })
    }
})

module.exports = biodata
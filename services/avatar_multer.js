const express = require("express")
const multer = require("multer")
const path = require("path")

const uploadStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname, `../static/uploads/avatar`))
    },
    filename : function(req,file,cb){
        cb(null, Date.now() + "_" + file.originalname)
    }
})

const upload_avatar = multer({storage : uploadStorage})

module.exports = upload_avatar
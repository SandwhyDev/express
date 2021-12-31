const express = require('express')
const cors = require("cors")
const user = require('./routes/user_route')
const biodata = require('./routes/biodata_route')

require("dotenv").config()

const app = express()
const {PORT} = process.env

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//route
app.use("/api", user)
app.use("/api", biodata)

//listener
  app.listen(PORT, ()=>{
    console.log(`
    =========================
      listened to port ${PORT}
    =========================
    
    `);
    

})



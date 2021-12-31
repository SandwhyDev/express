const nodemailer = require('nodemailer');
require("dotenv").config()

const welcomeMail = async(to, msg)=>{
    let transporter = await nodemailer.createTransport({
        service : "gmail",
        host : "smtp.gmail.com",
        port : 465,
        secure : true,
        auth : {
            user : "sandwhydev@gmail.com",
            pass : "sandy0102!"
        }
    })

    const mailOption = await {
        from : process.env.usermail,
        to : to,
        subject : "TERIMA KASIH SUDAH DAFTAR DI KAMI",
        html : `
        <h1>HALO ${msg}</h1></br>
        <div class="container" style="text-align: center;" align="center">
        <div class="header" style="width: 500px; height: auto; min-height: 500px; background-color: red;"><h3>HEADER</h3></div>
        <div class="content" style="width: 500px; height: auto; min-height: 500px; background-color: green;"><h3>CONTENT</h3></div>
        <div class="footer" style="width: 500px; height: auto; min-height: 500px; background-color: yellow;"><h4>FOOTER</h4></div>
    </div>
        
        `
    }

    return transporter.sendMail(mailOption, function(err, info){
        if(err) console.log(err);
        else console.log(info);
    })

}

module.exports = welcomeMail
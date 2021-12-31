const bcrypt = require("bcryptjs")

const salt = bcrypt.genSaltSync(10)

const hash_password = (pass)=>{
    return bcrypt.hashSync(pass,salt)
}

const compare_password = (pass,hash)=>{
    return bcrypt.compareSync(pass,hash)
}

module.exports = {hash_password, compare_password}
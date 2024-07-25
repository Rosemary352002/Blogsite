const mongoose = require('mongoose')

const schema = mongoose.Schema({
    FirstName:String,
    LastName:String,
    MobNo:Number,
    Email:String,
    Password:String,
    role:String
    
})

const userModel = mongoose.model('user', schema)
module.exports = userModel
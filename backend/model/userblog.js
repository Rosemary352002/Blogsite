const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    bloggername:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    comments:{
        type: Array,
        default: []
    },
    
    
})

const userModel = mongoose.model('userblog', schema)
module.exports = userModel
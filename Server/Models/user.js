const { timeStamp } = require('console');
const moongose = require('mongoose');
const { type } = require('os');

const UserScehma = new moongose.Schema({
    name:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        unique:true,
        required:true,
        match:[/^\S+@\S+\.\S+$/, "Invalid EmailId format"]
    },
    phone:{
        type:Number,
        minlength:9,
        maxLength:15,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    budget:{
        type:Number,
        default:-1,
    }
}, {timeStamp: true});



module.exports =  moongose.model("User", UserScehma);
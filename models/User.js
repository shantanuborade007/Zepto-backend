const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name:{
        type : String,
        requir : true,
        trim : true
    },
    phoneNumber:{
        type : String,
        required : true
    },
    email:{
        type : String,
        require : true
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    address:{
        type:String
    },
    orderes:[{
        type:mongoose.Schema.Types.ObjectId , 
        ref:"order"
    }]




});

module.exports = mongoose.model("user",userSchema)
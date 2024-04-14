const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name:{
        type:String
    },
    category:{
        type:String
    },
    subcategory:{
        type:String
    },
    quantity:{
        type:String
    },
    price:{
        type:Number
    },
    image:{
        type:String
    },
    description:{
        type:String
    }

})

module.exports = mongoose.model("product",productSchema)
const mongoose= require("mongoose")

const orderSchema = new mongoose.Schema({
    phoneNumber:{
        type:String
    },
    products:[{
        productId:String,
        quantity:Number,
        price:Number
    }],
    totalPrice:{
        type:Number
    },
    orderDate:{
        type:Date,
    },
    address:{
        type:String
    },
    status:{
        type: String,
        enum: ['pending', 'confirmed'],
        default: 'pending'
    }
    
   });
   
   module.exports = mongoose.model("order",orderSchema)
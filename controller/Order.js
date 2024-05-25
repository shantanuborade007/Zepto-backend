const Order= require("../models/Order")
const User = require( "../models/User");

exports.createOrder = async (req, res) => {
    try {
        const { phoneNumber, products, totalPrice, status } = req.body;
        const newOrder = new Order({
            phoneNumber,
            products,
            totalPrice,
            orderDate:Date(),
            status,
            address:null
        });
        const savedOrder = await newOrder.save();

        const user = await User.findOne({phoneNumber});
        if (user) {
            user.orderes.push(savedOrder._id);
            await user.save();
        }

        return res.status(201).json({
            success: true,
            data:savedOrder,
            id:savedOrder._id,
            message:"order created successfully !"
        }) 
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ 
            success:false,
            message:"Internal Server Error"
        });
    }
};

exports.editorder = async(req,res)=>{
    try{
        const {id,address} = req.body

        const order = await  Order.findByIdAndUpdate(id)

        order.address=address
        await order.save()

        return res.status(200).json({
            success :true ,
            message: "the order has been updated Successfully",
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}


exports.confirmOrder = async(req,res)=>{
        try{

            //this api will be hit after the transaction is successful !
             const {id}= req.body;

             const order= await  Order.findById(id);
             order.status="confirmed"

             order.save();
             return res.status(200).json({
                success: true,
                message:"order confirmed successfully !"
             })
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message:"Server error!"
            })
        }

}



exports.getOrderByPhoneNumber = async(req,res)=>{
    try{
    // const { phoneNumber } = req.body;
    console.log("cccccccc"+req.params+" "+ req.query.phoneNumber);
    // const { phoneNumber } = req.params.phoneNumber;

     const phoneNumber = '+' + req.query.phoneNumber;
     
    if (!phoneNumber) {
        return res.status(400).json({
            success: false,
            message: "Phone number is required"
        });
    }

    const orders = await Order.find({ phoneNumber });
    if (orders.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No orders found for this phone number"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Orders retrieved successfully",
        data: orders
    });
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message:"Internal  server error!"
        })
    }
}

exports.getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find({});
        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            data: orders
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

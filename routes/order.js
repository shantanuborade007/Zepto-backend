const express = require("express")
const router = express.Router()

const {createOrder,
        editorder,
        confirmOrder,
        getOrderByPhoneNumber,
        }=require("../controller/Order")

router.post('/createorder',createOrder);
router.put('/editorder',editorder);
router.put("/confirm",confirmOrder)
router.get('/getorderbynumber', getOrderByPhoneNumber);


module.exports=router
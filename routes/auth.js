const express = require("express")
const router = express.Router()

const {sendOtp,verifyOtp,signup,getuserByPhoneNo}=require("../controller/Auth")

router.post("/verifyotp",verifyOtp)
router.post("/sendotp",sendOtp)
router.post("/signup",signup)
router.post("/getuser",getuserByPhoneNo)



module.exports=router
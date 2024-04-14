const express = require("express")
const router = express.Router()

const {updateproducts}=require("../controller/Excel")

router.get("/update-prices",updateproducts)

module.exports=router

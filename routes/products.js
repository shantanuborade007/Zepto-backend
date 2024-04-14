const express = require("express")
const router = express.Router()

const {createproduct,getallproducts,getproductByid,deleteProductById,updateProduct}= require("../controller/Product");

router.post("/createproduct",createproduct)
router.get("/getallproducts",getallproducts)
router.get("/getproductbyid",getproductByid)
router.delete('/deleteproduct', deleteProductById);
router.put('/updateproduct',updateProduct)

module.exports=router
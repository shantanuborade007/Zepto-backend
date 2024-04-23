const Product = require("../models/Product")
const cloudinary = require('cloudinary').v2;

function isSupported(type,supportedType) {
    return supportedType.includes(type)
  }


  async function uploadTocloudinary(file,folder,quality){

    const options={folder};
    console.log('log2')
    if(quality){
        options.quality=quality;
    }
    options.resource_type = "auto";
    console.log('log3')  
    return await cloudinary.uploader.upload(file.tempFilePath,options);
  }

  exports.createproduct = async(req,res)=>{
    try{
        const {name,category,subcategory,quantity,price,description}=req.body
        const file = req.files.imageFile
        
        const product = await  new Product({name,category,subcategory,quantity,price,description,image:null}).save()

        const supportedType=["png","jpeg","jpg"];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File format is not supported"
            })
        }

        const response = await uploadTocloudinary(file, "zepto");
        product.image=response.secure_url;
        await product.save();

        res.status(201).json({
            success: true,
            data: product,
            message:"Product created succesfully !"
          });



    }catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"error occoured while creating a product"
        })
    }
  }

  exports.getallproducts = async(req,res)=>{
    try{
        const products = await Product.find();

        if(products.length === 0 ) {
            return res.status(400).json({
                success: false,
                message:"Unable to find the products"
            })
        }

        return res.status(200).json({
            success:true,
            data:products,
            message:"products"
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
  }


  exports.getproductByid = async(req,res)=>{
    try{
            const {id}=req.body;

            const product = await Product.findById(id);

            return res.status(200).json({
                success: true,
                message: "Product Found",
                data:product
            })
        
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Bad request"
        })
    }
  }

  exports.deleteProductById = async(req, res) => {
    try {
      const { id } = req.body;

      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully"
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }




  exports.updateProduct = async (req, res) => {
    try {
      const { id, name, quantity, price, description } = req.body;

      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }

      product.name = name || product.name;
      product.quantity = quantity || product.quantity;
      product.price = price || product.price;
      product.description = description || product.description;

      await product.save();

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }

  exports.findProductsByCategory = async (req, res) => {
    try {
      //Fruits or Vegetable case sensetive
      const { category } = req.body; // Assuming category is passed as a query parameter

      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Category is required"
        });
      }

      const categories = ['vegetable', 'fruits']; // Defined categories

      if (!categories.includes(category.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: "Invalid category. Please choose either 'vegetable' or 'fruit'"
        });
      }

      const products = await Product.find({ category:category });

      if (products.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No products found in this category"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Products found",
        data: products
      });

    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }

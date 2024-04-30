const express = require("express")
const db=require("./config/database")
const app = express()
const PORT= process.env.PORT || 4000;
const fileUpload = require('express-fileupload');
const cloudinary=require('./config/cloudinary');
require("dotenv").config();
const user = require("./routes/auth")
const product = require("./routes/products")
const order = require("./routes/order")
const update=require("./routes/excel")
const cors = require('cors');


app.use(cors());
app.use(express.json());


const fileupload=require("express-fileupload");
app.use(fileupload(
    {
        useTempFiles : true,
       tempFileDir : '/tmp/',
       
    }
));
db.connect();
cloudinary.cloudinaryConnect();




app.use("/api/v1",user)
app.use('/api/v1',product)
app.use('/api/v1',order)
app.use('/api/v1',update)

app.get('/test', (req, res) => {
    res.status(200).send('API is working properly');
});




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
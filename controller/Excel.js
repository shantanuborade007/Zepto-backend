const { GoogleSpreadsheet } = require('google-spreadsheet');
const spreadsheetId = '12UycO67HiZ_Zdb6FJ4SD_5Qe8THp9TyWD2E8ehVIUBI';
const sheetName = "Sheet1"
const { JWT } = require('google-auth-library');
const productIdCol = 1;
const priceCol = 6;
const productModel = require("../models/Product")



async function updatePrices() {
    try {
 
    const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY,
        scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
        ],
    });

    const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);
    await doc.loadInfo();
    //   const doc = new GoogleSpreadsheet(spreadsheetId);

    //   console.log(await doc.
      const sheet = doc.sheetsByTitle[sheetName];
    //   console.log(doc.sheetsByTitle)
      const rows = await sheet.getRows();
      for (const row of rows) {
       

        const rawData = row._rawData; // Get the raw data array
        const productId = rawData[productIdCol - 1];  // Access product ID based on column index
        const newPrice = rawData[priceCol - 1];        // Access new price based on column index
  
        // Now you can use productId and newPrice for your logic (e.g., update MongoDB)
        // console.log(`Product ID: ${productId}, New Price: ${newPrice}`);
        // console.log(productId + ":" + newPrice);
        // Update product price in MongoDB using appropriate method (e.g., findByIdAndUpdate)
        await productModel.findByIdAndUpdate(productId, { price: newPrice });
      }
  
      console.log('Product prices updated in MongoDB');
    } catch (err) {
      console.error('Error updating prices:', err);
    }
  }

  exports.updateproducts = async(req,res)=>{
    try{
        await updatePrices();
        return res.status(200).json({
            success: true,
            message: "Product prices updated successfully"
        });
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Failed To update the data"
        })
    }
  }

//   app.get('/update-prices', (req, res) => {
//     updatePrices().then(() => {
//       res.send('Product prices updated successfully');
//     }).catch(err => {
//         console.log(err)
//       res.status(500).send('Error updating prices');
//     });
//   });
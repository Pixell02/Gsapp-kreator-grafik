
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const request = require("request");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/v2_1/orders', async (req,res) => {

  const customerIp = encodeURIComponent(req.body.customerIp);
  const merchantPosId = encodeURIComponent(req.body.merchantPosId);
  const description = encodeURIComponent(req.body.description);
  const md5Key = encodeURIComponent("94c26aa12c41e5c2b2d820ec3bcd77a1")
  let totalAmount = encodeURIComponent(req.body.totalAmount);
  const currencyCode = encodeURIComponent(req.body.currencyCode);
  const productName = encodeURIComponent(req.body.productName);
  const productUnitPrice = encodeURIComponent(req.body.unitPrice);
  let quantity = encodeURIComponent(req.body.quantity); 
  const notifyUrl = encodeURIComponent(req.body.notifyUrl);
  const continueUrl = encodeURIComponent(req.body.continueUrl);

  const sortedData = `continueUrl=http%3A%2F%2Fshop.url%2Fcontinue&currencyCode=PLN&customerIp=123.123.123.123&description=Opis+zam%C3%B3wienia&merchantPosId=145227&notifyUrl=http%3A%2F%2Fshop.url%2Fnotify&products[0].name=Produkt+1&products[0].quantity=1&products[0].unitPrice=1000&totalAmount=1000&13a980d4f851f3d9a1cfc792fb1f5e50`;
  const decoded = sortedData.replace(/%20/g, '+');
  
  const hash = crypto.createHash('sha256').update(decoded).digest('hex');
  console.log(hash)
  // var data = {
  //   continueUrl: "http://shop.url/continue",
  //   currencyCode: "PLN",
  //   customerIp: "123.123.123.123",
  //   description: "Opis zamówienia",
  //   merchantPosId: 145227,
  //   notifyUrl: "http://shop.url/notify",
  //   products: [
  //     {
  //       name: "Produkt 1",
  //       quantity: 1,
  //       unitPrice: 1000
  //     }
  //   ],
  //   totalAmount: 1000,
    
  // };
  
  // let encodedData = "";
  // for (let key in data) {
  //   if (data.hasOwnProperty(key)) {
  //     encodedData += key + "=" + encodeURIComponent(data[key]) + "&";
      
  //   }
  // }
  // encodedData += "13a980d4f851f3d9a1cfc792fb1f5e50";
  // console.log(encodedData);




  let openSignature = `sender=145227;algorithm=SHA-256;signature=${hash}`;
  console.log(openSignature);
  return res.json({openSignature});
//  const paymentData = req.body;
//  console.log(paymentData)
//  const paymentString = JSON.stringify(paymentData);
//  try {
//   const response = await axios.post("https://secure.payu.com/api/v2_1/orders", paymentString);
  
//   const redirectUri = response.data;
//   console.log(redirectUri);
//   return res.json({redirectUri})
//  } catch (err) {
//   return res.status(500).json({error: err.message});
//  }

})

app.listen(port, () => {
  console.log(`server listening on ${port}`)
})
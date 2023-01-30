
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


app.post('/hash', async (req,res) => {
 
 const paymentData = req.body;
 console.log(paymentData)
 const paymentString = JSON.stringify(paymentData);
 try {
  const response = await axios.post("https://secure.payu.com/api/v2_1/orders", paymentString);
  
  const redirectUri = response.data;
  console.log(redirectUri);
  return res.json({redirectUri})
 } catch (err) {
  return res.status(500).json({error: err.message});
 }

})

app.listen(port, () => {
  console.log(`server listening on ${port}`)
})
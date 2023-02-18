
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const request = require("request");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express();
const port = 8000;

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
  
  const continueUrl = encodeURIComponent(req.body.continueUrl);

  const sortedData = `continueUrl=${continueUrl}&currencyCode=${currencyCode}&customerIp=${customerIp}&description=${description}&merchantPosId=${merchantPosId}&products[0].name=${productName}&products[0].quantity=${quantity}&products[0].unitPrice=${productUnitPrice}&totalAmount=${totalAmount}&${md5Key}`;
  const decoded = sortedData.replace(/%20/g, '+');
  console.log(decoded);
  const hash = crypto.createHash('sha256').update(decoded).digest('hex');
  console.log(hash);
  let openSignature = `sender=${merchantPosId};algorithm=SHA-256;signature=${hash}`;
  console.log(openSignature);
  return res.json({openSignature});


})

app.listen(port, () => {
  console.log(`server listening on ${port}`)
})
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import { useHistory, useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../../../img/logo.png";
import PayULogo from "../../../img/PayU.png";
import "./MainContentOffer.css";
import { Windows } from "react-bootstrap-icons";

function BuyFormContainer() {
  const [price, setPrice] = useState(1);
  const { user } = useAuthContext();
  const { documents: userData } = useCollection("userData", [
    "uid",
    "==",
    user.uid,
  ]);
  const { documents: License } = useCollection("user", ["uid", "==", user.uid]);

  const [customerIp] = useState("123.123.123.123");
  const [merchantPosId, setMerchantPosId] = useState("145227");
  const [description, setDescription] = useState("Opis zamówienia");
  const [totalAmount, setTotalAmount] = useState("1000");
  const [txnid, setTxnid] = useState(
    "txn" + Math.round(Math.random(1000, 5000) * 10000)
  );
  const [firstName, setFirstName] = useState("asdasd");
  const [lastName, setLastName] = useState("asdasd");
  const [address, setAddress] = useState("asdasdasd");
  const [postCode, setPostCode] = useState("66-100");
  const [surl] = useState("localhost:3000/response");
  const [furl] = useState("localhost:3000/response");
  const [city, setCity] = useState("sulechów");
  const [nip, setNip] = useState();
  const [companyName, setCompanyName] = useState();
  const [email, setEmail] = useState("asd@asd.pl");
  const [currencyCode, setCurrencyCode] = useState("PLN");
  const [productName, setProductName] = useState("Produkt 1");
  const [unitPrice, setUnitPrice] = useState("1000");
  const [quantity, setQuantity] = useState("1");
  const [notifyUrl, setNotifyUrl] = useState("http://shop.url/notify");
  const [continueUrl, setContinueUrl] = useState("http://shop.url/continue");
  const [md5Key, setMd5Key] = useState("bcdb18e54a3fd3946efc561ff7d84f4e");
  const [hash, setHash] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [openPayuSignature, setOpenPayuSignature] = useState();
  const [formData, setFormData] = useState({
    customerIp: customerIp,
    merchantPosId: merchantPosId,
    description: description,
    currencyCode: currencyCode,
    totalAmount: "5000",
    exOrderId: "12345",
    buyer: {
      email: "asdasd@asdasd.com",
      phone: "123123123",
      firstName: "Asdasdasd",
      lastName: "asdasdasd",
    },
    products: [
      {
        name: "Pakiet UNLIMITED",
        unitPrice: "5000",
        quantity: "1",
      },
    ],
  });

  const handleChange = (e) => {
    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    } else if (e.target.name === "lastName") {
      setLastName(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "post-code") {
      setPostCode(e.target.value);
    } else if (e.target.name === "city") {
      setCity(e.target.value);
    } else if (e.target.name === "nip") {
      setNip(e.target.value);
    } else if (e.target.name === "company-name") {
      setCompanyName(e.target.value);
    }
  };
  const [redirectUri, setRedirectUri] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/v2_1/orders", {
        customerIp,
        merchantPosId,
        description,
        totalAmount,
        currencyCode,
        productName,
        unitPrice,
        quantity,
        continueUrl,
        notifyUrl
      })
      .then((res) => {
        console.log(res.data.openSignature);
        setOpenPayuSignature(res.data.openSignature);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [firstName]);

  return (
    <div className="form-container">
      <div className="logo-block">
        <img src={logo} className="logo-image" />
      </div>
      <div className="price-container">
        <h1>{50 * price}zł</h1>
      </div>

      <form
        action="https://secure.payu.com/api/v2_1/orders"
        method="post"
        className="form-container"
      >
        <p className="form-title">Dane do faktury</p>
        <div className="inner-content-country-label">
          <div className="label-content"></div>
        </div>
        <input type="text" onChange={(e) => setFirstName(e.target.value)} />
        {/* <div className="fullName-content">
          <div className="inner-label-containers">
            <div className="label-content">
              <label>Imię</label>
              <span style={{ color: "red" }}>*</span>
            </div>
            <input
              type="text"
              id="name"
              name="firstName"
              placeholder=" Imię"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
          </div>
          <div className="label-content">
            <div className="inner-label-containers">
              <label>Nazwisko</label>
              <span style={{ color: "red" }}>*</span>
            </div>
            <input
              type="text"
              id="surName"
              name="lastName"
              placeholder=" Nazwisko"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </div>
        </div>
        <div className="data-content">
          <div className="label-content">
            <div className="label-name">
              <label>Adres</label>
              <span style={{ color: "red" }}>*</span>
            </div>
            <input
              type="text"
              id="address"
              name="address"
              placeholder=" Adres"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="label-content">
            <div className="label-name">
              <label>Kod pocztowy</label>
              <span style={{ color: "red" }}>*</span>
            </div>
            <input
              type="text"
              id="post-code"
              name="post-code"
              placeholder=" Kod pocztowy"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
              required
            />
          </div>
          <div className="label-content">
            <div className="label-name">
              <label>Miasto</label>
              <span style={{ color: "red" }}>*</span>
            </div>
            <input
              type="text"
              id="city"
              name="city"
              placeholder=" Miasto"
              value={city}
              onChange={handleChange}
              required
            />
          </div>
          <input type="hidden" id="hash" name="hash" value={hash} />
          <input
            type="hidden"
            id="customerIp"
            name="customerIp"
            value="127.0.0.1"
          />
          <input
            type="hidden"
            id="description"
            name="description"
            value="pakiet UNLIMITED"
          />
          <input
            type="hidden"
            id="currencyCode"
            name="currencyCode"
            value="PLN"
          />
          <input
            type="hidden"
            id="totalAmount"
            name="totalAmount"
            value="100"
          />
          <input
            type="hidden"
            id="buyer.email"
            name="buyer.email"
            value="example@email.com"
          />
          <input
            type="hidden"
            id="buyer.phone"
            name="buyer.phone"
            value="1234567890"
          />
          <input
            type="hidden"
            id="buyer.firstName"
            name="buyer.firstName"
            value="Jan"
          />
          <input
            type="hidden"
            id="buyer.lastName"
            name="buyer.lastName"
            value="Kowalski"
          />
          <input
            type="hidden"
            id="products[0].name"
            name="products[0].name"
            value="Product 1"
          />
          <input
            type="hidden"
            id="products[0].unitPrice"
            name="products[0].unitPrice"
            value="25"
          />
          <input
            type="hidden"
            id="products[0].quantity"
            name="products[0].quantity"
            value="2"
          />
          <input
            type="hidden"
            id="exOrderId"
            name="exOrderId"
            value="4ootjspnkgky966mg88viu"
          />
        </div> */}
<input type="hidden"name="customerIp" value={customerIp} />
<input type="hidden"name="merchantPosId" value={merchantPosId} />
<input type="hidden"name="description" value={description} />
<input type="hidden"name="totalAmount" value={totalAmount} />
<input type="hidden"name="currencyCode" value={currencyCode} />
<input type="hidden"name="products[0].name" value={productName} />
<input type="hidden"name="products[0].unitPrice" value={unitPrice} />
<input type="hidden"name="products[0].quantity" value={quantity} />
<input type="hidden"name="notifyUrl" value={notifyUrl} /> 
<input type="hidden"name="continueUrl" value={continueUrl} />
<input name="OpenPayu-Signature" value={openPayuSignature} />



        <div className="checkbox-container" style={{ marginBottom: "20px" }}>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span>Dane firmowe</span>
          </label>
        </div>
        {isChecked && (
          <div className="data-content">
            <div className="label-content">
              <div className="label-name">
                <label>NIP</label>
                <span style={{ color: "red" }}>*</span>
              </div>
              <input
                type="text"
                id="nip"
                name="nip"
                placeholder=" NIP"
                value={nip}
                onChange={setNip}
                required
              />
            </div>
            <div className="label-content">
              <div className="label-name">
                <label>Nazwa Firmy</label>
                <span style={{ color: "red" }}>*</span>
              </div>
              <input
                type="text"
                id="company-name"
                name="company-name"
                placeholder=" Nazwa Firmy"
                value={companyName}
                onChange={setCompanyName}
                required
              />
            </div>
          </div>
        )}
        <div className="btn-container">
          <button type="submit" formTarget="_blank">
            Kup
          </button>
        </div>
      </form>
    </div>
  );
}

export default BuyFormContainer;

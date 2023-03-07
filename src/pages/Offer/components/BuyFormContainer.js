import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import { useHistory, useNavigate } from "react-router-dom";
import { SHA256, enc } from "crypto-js";
import axios from "axios";

import logo from "../../../img/2.png";
import logo1 from "../../../img/1.svg"
import PayULogo from "../../../img/PayU.png";
import "./MainContentOffer.css";
import { LayoutSplit, Windows } from "react-bootstrap-icons";
import { decode } from "@firebase/util";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Select from "react-select";

const zipCodeRegex = /^\d{2}-\d{3}$/;
const nipRegex = /^\d{10}$/;

function BuyFormContainer() {
  const [price, setPrice] = useState(1);
  const { user } = useAuthContext();
  const { documents: userData } = useCollection("userData", [
    "uid",
    "==",
    user.uid,
  ]);
  const { documents: transactions } = useCollection("transactions", [
    "uid",
    "==",
    user.uid,
  ]);

  const { documents: License } = useCollection("user", ["uid", "==", user.uid]);

  const [customerIp] = useState(encodeURIComponent("123.123.123.123"));
  const [merchantPosId, setMerchantPosId] = useState("4283004");
  const [description, setDescription] = useState("Licencja");

  const [txnid, setTxnid] = useState(Date.now());
  const [products, setProducts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("Poland");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [countryCode, setCountryCode] = useState("PL");
  const [city, setCity] = useState("");
  const [nip, setNip] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [notifyUrl, setNotifyUrl] = useState("https://gsapp.pl/success");
  const [email, setEmail] = useState(user.email);
  const [currencyCode, setCurrencyCode] = useState("PLN");
  const [productName, setProductName] = useState("Produkt 1");
  const [unitPrice, setUnitPrice] = useState("5000");
  const [totalAmount, setTotalAmount] = useState(0);
  const [quantity, setQuantity] = useState("1");
  const [continueUrl, setContinueUrl] = useState("https://gsapp.pl/success");
  const [md5Key, setMd5Key] = useState("94c26aa12c41e5c2b2d820ec3bcd77a1");
  const [hash, setHash] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [openPayuSignature, setOpenPayuSignature] = useState();
  const [additionalDescription, setAdditionalDescription] = useState("");
  const [postCodeError, setPostCodeError] = useState("");
  const [nipError, setNipError] = useState("");
  const [data, setData] = useState({});
  const [radioType, setRadioType] = useState("Licencja MAX 1 miesiąc");

  useEffect(() => {
    const data = {
      customerIp: "127.0.0.1",
      merchantPosId: "459912",
      description: description,
      currencyCode: "PLN",
      totalAmount: totalAmount,
      buyer: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        language: countryCode
      },
      products: products
    }
    setData(data);
  },[description, totalAmount, email, firstName, lastName, countryCode, products])
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post("https://us-central1-poster-dd714.cloudfunctions.net/api", data)
  //   .then((res) => {
  //     console.log(res.data)
  //   })
  //   .catch(err => console.log(err))
  // }

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    if (checked) {
      if (e.target.name === "Licencja MAX 1 miesiąc") {
        setProducts((prevProducts) => [
          { name: e.target.name, unitPrice: e.target.value },
        ]);
        setDescription("Licencja")
      } else {
        setProducts((prevProducts) =>
          prevProducts.filter(
            (product) => product.name !== "Licencja MAX 1 miesiąc"
          )
        );
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.name !== "other")
        );
        setDescription("Usługi graficzne")
        setProducts((prevProducts) => [
          ...prevProducts,
          { name, unitPrice: parseFloat(value) },
        ]);
      }
    } else {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.name !== name)
      );
    }
    
  };
  useEffect(() => {
    if(products.length === 0) {
      products.push({ name: "Licencja MAX 1 miesiąc", unitPrice: "5000"})
    }
  },[])
  
  useEffect(() => {
    let price = 0;

    products.forEach((product) => {
      price += Number(product.unitPrice);
    });
    setTotalAmount(price);
  }, [products, radioType]);
  

  const [formFirstName, setFormFirstName] = useState();
  const [formLastName, setFormLastName] = useState();

  useEffect(() => {
    setTotalAmount(unitPrice);
  }, [unitPrice]);

  useEffect(() => {
    if (postCode) {
      const validatePostCode = (postCode) => {
        if (!zipCodeRegex.test(postCode)) {
          setPostCodeError("Niepoprawny kod pocztowy");
          return false;
        }
        setPostCodeError("");
        return true;
      };
    }
    if (nip) {
      const validateNip = (nip) => {
        if (!nipRegex.test(nip)) {
          setNipError("Niepoprawny nip");
          return false;
        }
        setNipError("");
        return true;
      };
    }
  }, []);
  useEffect(() => {
    if (userData) {
      if (userData.length > 0) {
        setFirstName(userData[0].firstName);
        setLastName(userData[0].lastName);
        setAddress(userData[0].address);
        setPostCode(userData[0].postCode);
        setCity(userData[0].city);
        setCountry(userData[0].country);
        if (userData[0].NIP) {
          setIsChecked(true);
          setNip(userData[0].NIP);
          setCompanyName(userData[0].companyName);
          setAdditionalDescription("asdasd");
        }
      }
    } else {
      setFirstName("");
      setLastName("");
      setAddress("");
      setPostCode("");
      setCity("");
      setCountry("");
    }
  }, [userData]);
  useEffect(() => {
    if (!isChecked) {
      setFormFirstName(firstName.toString());
      setFormLastName(lastName.toString());
    } else {
      setFormFirstName(nip.toString());
      setFormLastName(companyName.toString());
    }
  }, [isChecked, firstName, lastName, companyName, nip]);

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
  const [isActiveButton, setActiveButton] = useState(false);
  useEffect(() => {
    if (isChecked) {
      if (
        !nipRegex.test(nip) ||
        !companyName ||
        !firstName ||
        !lastName ||
        !city ||
        !address ||
        !email ||
        !zipCodeRegex.test(postCode)
      ) {
        setActiveButton(false);
      } else {
        setActiveButton(true);
      }
    } else if (!isChecked) {
      if (
        !firstName ||
        !lastName ||
        !city ||
        !address ||
        !zipCodeRegex.test(postCode)
      ) {
        setActiveButton(false);
      } else {
        setActiveButton(true);
      }
    }
  }, [
    firstName,
    lastName,
    address,
    postCode,
    city,
    nip,
    companyName,
    isChecked,
    email,
  ]);
  const handleSave = () => {
    const docRef = collection(db, "transaction");
    addDoc(docRef, {
      uid: user.uid,
      status: "inProgress",
      amount: totalAmount,
      description: description,
      products: products,
      orderId: txnid,
    });
  };

  useEffect(() => {
    const enContinueUrl = encodeURIComponent(continueUrl);
    const enCountryCode = encodeURIComponent(countryCode);
    const enCurrencyCode = encodeURIComponent(currencyCode);
    const enCustomerIp = encodeURIComponent(customerIp);
    const enDescription = encodeURIComponent(description);
    const enMerchantPosId = encodeURIComponent(merchantPosId);
    const enProductName = encodeURIComponent(productName);
    const enQuantity = encodeURIComponent(quantity);
    const enUnitPrice = encodeURIComponent(unitPrice);
    const enTotalAmount = encodeURIComponent(totalAmount);
    const enMd5key = encodeURIComponent(md5Key);
    const enNotifyUrl = encodeURIComponent(notifyUrl);
    const enOrderId = encodeURIComponent(txnid);
    const enFirstName = encodeURIComponent(formFirstName);
    const enLastName = encodeURIComponent(formLastName);
    const enNip = encodeURIComponent(nip);
    const enCompanyName = encodeURIComponent(companyName);
    const enPostCode = encodeURIComponent(postCode);
    const enEmail = encodeURIComponent(email);
    let sortedData;

    sortedData = `buyer.delivery.countryCode=${enCountryCode}&buyer.delivery.postalCode=${enPostCode}&buyer.email=${enEmail}&buyer.firstName=${enFirstName}&buyer.lastName=${enLastName}&continueUrl=${enContinueUrl}&currencyCode=${enCurrencyCode}&customerIp=${enCustomerIp}&description=${enDescription}&extOrderId=${enOrderId}&merchantPosId=${enMerchantPosId}&notifyUrl=${enNotifyUrl}&products[0].name=${enProductName}&products[0].quantity=${enQuantity}&products[0].unitPrice=${enUnitPrice}&totalAmount=${enTotalAmount}&${enMd5key}`;

    const decoded = sortedData.replace(/%20/g, "+");

    const hash = SHA256(decoded).toString(enc.Hex);

    let openSignature = `sender=${merchantPosId};algorithm=SHA-256;signature=${hash}`;
    setOpenPayuSignature(openSignature);
  }, [
    firstName,
    lastName,
    address,
    postCode,
    city,
    nip,
    companyName,
    isChecked,
    formFirstName,
    formLastName,
    countryCode,
    unitPrice,
    totalAmount,
    txnid,
    continueUrl,
  ]);
  const services = [
    { id: 1, name: "grafika indywidualna Dzień meczowy", price: "7000" },
    { id: 2, name: "grafika indywidualna Zapowiedź meczu", price: "7000" },
    { id: 3, name: "grafika indywidualna GOOOL", price: "7000" },
    { id: 3, name: "grafika indywidualna Skład wyjściowy", price: "7000" },
    { id: 4, name: "grafika indywidualna wynik", price: "7000" },
    { id: 5, name: "wycinanie herbów z tła (cała liga)", price: "5000" },
    { id: 6, name: "wycinanie zawodników z tła ( do 25 osób)", price: "15000" },
  ];

  return (
    <div className="form-container">
      <div className="logo-block" >
        <img src={logo} className="logo-image" />
      </div>
      <div className="price-container">
        <h1>{totalAmount / 100}zł</h1>
      </div>
      <div className="package-container">
        <label>
          <input
            type="radio"
            value="5000"
            name="Licencja MAX 1 miesiąc"
            onChange={(e) => {
              handleCheckboxChange(e);
              setRadioType(e.target.name);
            }}
            checked={radioType === "Licencja MAX 1 miesiąc"}
            defaultChecked
          />
          <span>1 miesiąc</span>
        </label>

        <label>
          <input
            type="radio"
            value="0"
            name="other"
            onChange={(e) => {
              handleCheckboxChange(e);
              setUnitPrice(e.target.value);
              setRadioType(e.target.name);
            }}
            checked={radioType === "other"}
          />
          <span>Usługi</span>
        </label>
      </div>
      <label>
        <input type="radio" />
      </label>
      {radioType && radioType === "other" && (
        <>
          <div className="services-container mt-5 d-flex flex-column ">
            {services.map((service) => (
              <div className="service-content d-flex flex-row">
                <div className="checkbox-container">
                  <label style={{ height: "50px", width: "50px" }}>
                    <input
                      type="checkbox"
                      onChange={handleCheckboxChange}
                      name={service.name}
                      value={service.price}
                    />
                    <span></span>
                  </label>
                </div>
                <div className="service-name-container">
                  <div>{service.name}</div>
                </div>
                <div className="service-price-container">
                  <div>{service.price / 100}zł</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="fax-container">
        <p className="form-title">Dane do faktury</p>

        <select
          name="country"
          className="form-control"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          required
        >
          <option value="AF">Afghanistan</option>
          <option value="AX">Åland Islands</option>
          <option value="AL">Albania</option>
          <option value="DZ">Algeria</option>
          <option value="AS">American Samoa</option>
          <option value="AD">Andorra</option>
          <option value="AO">Angola</option>
          <option value="AI">Anguilla</option>
          <option value="AQ">Antarctica</option>
          <option value="AG">Antigua and Barbuda</option>
          <option value="AR">Argentina</option>
          <option value="AM">Armenia</option>
          <option value="AW">Aruba</option>
          <option value="AU">Australia</option>
          <option value="AT">Austria</option>
          <option value="AZ">Azerbaijan</option>
          <option value="BS">Bahamas</option>
          <option value="BH">Bahrain</option>
          <option value="BD">Bangladesh</option>
          <option value="BB">Barbados</option>
          <option value="BY">Belarus</option>
          <option value="BE">Belgium</option>
          <option value="BZ">Belize</option>
          <option value="BJ">Benin</option>
          <option value="BM">Bermuda</option>
          <option value="BT">Bhutan</option>
          <option value="BO">Bolivia</option>
          <option value="BA">Bosnia and Herzegovina</option>
          <option value="BW">Botswana</option>
          <option value="BV">Bouvet Island</option>
          <option value="BR">Brazil</option>
          <option value="IO">British Indian Ocean Territory</option>
          <option value="BN">Brunei Darussalam</option>
          <option value="BG">Bulgaria</option>
          <option value="BF">Burkina Faso</option>
          <option value="BI">Burundi</option>
          <option value="KH">Cambodia</option>
          <option value="CM">Cameroon</option>
          <option value="CA">Canada</option>
          <option value="CV">Cape Verde</option>
          <option value="KY">Cayman Islands</option>
          <option value="CF">Central African Republic</option>
          <option value="TD">Chad</option>
          <option value="CL">Chile</option>
          <option value="CN">China</option>
          <option value="CX">Christmas Island</option>
          <option value="CC">Cocos (Keeling) Islands</option>
          <option value="CO">Colombia</option>
          <option value="KM">Comoros</option>
          <option value="CG">Congo</option>
          <option value="CD">Congo, The Democratic Republic of The</option>
          <option value="CK">Cook Islands</option>
          <option value="CR">Costa Rica</option>
          <option value="CI">Cote D'ivoire</option>
          <option value="HR">Croatia</option>
          <option value="CU">Cuba</option>
          <option value="CY">Cyprus</option>
          <option value="CZ">Czech Republic</option>
          <option value="DK">Denmark</option>
          <option value="DJ">Djibouti</option>
          <option value="DM">Dominica</option>
          <option value="DO">Dominican Republic</option>
          <option value="EC">Ecuador</option>
          <option value="EG">Egypt</option>
          <option value="SV">El Salvador</option>
          <option value="GQ">Equatorial Guinea</option>
          <option value="ER">Eritrea</option>
          <option value="EE">Estonia</option>
          <option value="ET">Ethiopia</option>
          <option value="FK">Falkland Islands (Malvinas)</option>
          <option value="FO">Faroe Islands</option>
          <option value="FJ">Fiji</option>
          <option value="FI">Finland</option>
          <option value="FR">France</option>
          <option value="GF">French Guiana</option>
          <option value="PF">French Polynesia</option>
          <option value="TF">French Southern Territories</option>
          <option value="GA">Gabon</option>
          <option value="GM">Gambia</option>
          <option value="GE">Georgia</option>
          <option value="DE">Germany</option>
          <option value="GH">Ghana</option>
          <option value="GI">Gibraltar</option>
          <option value="GR">Greece</option>
          <option value="GL">Greenland</option>
          <option value="GD">Grenada</option>
          <option value="GP">Guadeloupe</option>
          <option value="GU">Guam</option>
          <option value="GT">Guatemala</option>
          <option value="GG">Guernsey</option>
          <option value="GN">Guinea</option>
          <option value="GW">Guinea-bissau</option>
          <option value="GY">Guyana</option>
          <option value="HT">Haiti</option>
          <option value="HM">Heard Island and Mcdonald Islands</option>
          <option value="VA">Holy See (Vatican City State)</option>
          <option value="HN">Honduras</option>
          <option value="HK">Hong Kong</option>
          <option value="HU">Hungary</option>
          <option value="IS">Iceland</option>
          <option value="IN">India</option>
          <option value="ID">Indonesia</option>
          <option value="IR">Iran, Islamic Republic of</option>
          <option value="IQ">Iraq</option>
          <option value="IE">Ireland</option>
          <option value="IM">Isle of Man</option>
          <option value="IL">Israel</option>
          <option value="IT">Italy</option>
          <option value="JM">Jamaica</option>
          <option value="JP">Japan</option>
          <option value="JE">Jersey</option>
          <option value="JO">Jordan</option>
          <option value="KZ">Kazakhstan</option>
          <option value="KE">Kenya</option>
          <option value="KI">Kiribati</option>
          <option value="KP">Korea, Democratic People's Republic of</option>
          <option value="KR">Korea, Republic of</option>
          <option value="KW">Kuwait</option>
          <option value="KG">Kyrgyzstan</option>
          <option value="LA">Lao People's Democratic Republic</option>
          <option value="LV">Latvia</option>
          <option value="LB">Lebanon</option>
          <option value="LS">Lesotho</option>
          <option value="LR">Liberia</option>
          <option value="LY">Libyan</option>
          <option value="LI">Liechtenstein</option>
          <option value="LT">Lithuania</option>
          <option value="LU">Luxembourg</option>
          <option value="MO">Macao</option>
          <option value="MG">Madagascar</option>
          <option value="MW">Malawi</option>
          <option value="MY">Malaysia</option>
          <option value="MV">Maldives</option>
          <option value="ML">Mali</option>
          <option value="MT">Malta</option>
          <option value="MH">Marshall Islands</option>
          <option value="MQ">Martinique</option>
          <option value="MR">Mauritania</option>
          <option value="MU">Mauritius</option>
          <option value="YT">Mayotte</option>
          <option value="MX">Mexico</option>
          <option value="FM">Micronesia, Federated States of</option>
          <option value="MD">Moldova, Republic of</option>
          <option value="MC">Monaco</option>
          <option value="MN">Mongolia</option>
          <option value="ME">Montenegro</option>
          <option value="MS">Montserrat</option>
          <option value="MA">Morocco</option>
          <option value="MZ">Mozambique</option>
          <option value="MM">Myanmar</option>
          <option value="NA">Namibia</option>
          <option value="NR">Nauru</option>
          <option value="NP">Nepal</option>
          <option value="NL">Netherlands</option>
          <option value="NC">New Caledonia</option>
          <option value="NZ">New Zealand</option>
          <option value="NI">Nicaragua</option>
          <option value="NE">Niger</option>
          <option value="NG">Nigeria</option>
          <option value="NU">Niue</option>
          <option value="NF">Norfolk Island</option>
          <option value="MP">Northern Mariana Islands</option>
          <option value="NO">Norway</option>
          <option value="OM">Oman</option>
          <option value="PK">Pakistan</option>
          <option value="PW">Palau</option>
          <option value="PS">Palestine, State of</option>
          <option value="PA">Panama</option>
          <option value="PG">Papua New Guinea</option>
          <option value="PY">Paraguay</option>
          <option value="PE">Peru</option>
          <option value="PH">Philippines</option>
          <option value="PN">Pitcairn</option>
          <option value="PL">Poland</option>
          <option value="PT">Portugal</option>
          <option value="PR">Puerto Rico</option>
          <option value="QA">Qatar</option>
          <option value="RE">Reunion</option>
          <option value="RO">Romania</option>
          <option value="RU">Russian Federation</option>
          <option value="RW">Rwanda</option>
          <option value="SH">Saint Helena</option>
          <option value="KN">Saint Kitts and Nevis</option>
          <option value="SC">Saint Lucia</option>
          <option value="PM">Saint Pierre and Miquelon</option>
          <option value="VC">Saint Vincent and The Grenadines</option>
          <option value="WS">Samoa</option>
          <option value="SM">San Marino</option>
          <option value="ST">Sao Tome and Principe</option>
          <option value="SA">Saudi Arabia</option>
          <option value="SN">Senegal</option>
          <option value="RS">Serbia</option>
          <option value="SC">Seychelles</option>
          <option value="SL">Sierra Leone</option>
          <option value="SG">Singapore</option>
          <option value="SK">Slovakia</option>
          <option value="SI">Slovenia</option>
          <option value="SB">Solomon Islands</option>
          <option value="SO">Somalia</option>
          <option value="ZA">South Africa</option>
          <option value="GS">
            South Georgia and The South Sandwich Islands
          </option>
          <option value="ES">Spain</option>
          <option value="LK">Sri Lanka</option>
          <option value="SD">Sudan</option>
          <option value="SR">Suriname</option>
          <option value="SJ">Svalbard and Jan Mayen</option>
          <option value="SE">Sweden</option>
          <option value="CH">Switzerland</option>
          <option value="SY">Syrian Arab Republic</option>
          <option value="TW">Taiwan</option>
          <option value="TJ">Tajikistan</option>
          <option value="TZ">Tanzania, United Republic of</option>
          <option value="TH">Thailand</option>
          <option value="TL">Timor-leste</option>
          <option value="TG">Togo</option>
          <option value="TK">Tokelau</option>
          <option value="TO">Tonga</option>
          <option value="TT">Trinidad and Tobago</option>
          <option value="TN">Tunisia</option>
          <option value="TR">Turkey</option>
          <option value="TM">Turkmenistan</option>
          <option value="TC">Turks and Caicos Islands</option>
          <option value="TV">Tuvalu</option>
          <option value="UG">Uganda</option>
          <option value="UA">Ukraine</option>
          <option value="AE">United Arab Emirates</option>
          <option value="GB">United Kingdom</option>
          <option value="US">United States</option>
          <option value="UM">United States Minor Outlying Islands</option>
          <option value="UY">Uruguay</option>
          <option value="UZ">Uzbekistan</option>
          <option value="VU">Vanuatu</option>
          <option value="VE">Venezuela</option>
          <option value="VN">Viet Nam</option>
          <option value="VG">Virgin Islands, British</option>
          <option value="VI">Virgin Islands, U.S.</option>
          <option value="WF">Wallis and Futuna</option>
          <option value="EH">Western Sahara</option>
          <option value="YE">Yemen</option>
          <option value="M">Zambia</option>
          <option value="ZW">Zimbabwe</option>
        </select>
        <div className="fullName-content">
          <div className="inner-label-containers">
            <div className="label-content">
              <label>Imię</label>
              <span style={{ color: "red" }}>*</span>
            </div>
            <input
              type="text"
              name="firstName"
              placeholder=" Imię"
              onChange={(e) => setFirstName(e.target.value)}
              className="fullName"
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
              name="lastName"
              placeholder=" Nazwisko"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="fullName"
              required
            />
          </div>
        </div>
        <div className="label-content">
          <div className="inner-label-containers">
            <label>E-mail</label>
            <span style={{ color: "red" }}>*</span>
          </div>
          <input
            type="text"
            name="lastName"
            placeholder=" email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="fullName"
            required
          />
        </div>
        <div className="data-content">
          <div className="label-content">
            <div className="label-name">
              <label>Adres</label>
              <span style={{ color: "red" }}>*</span>
            </div>
            <input
              type="text"
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
              name="city"
              placeholder=" Miasto"
              value={city}
              onChange={handleChange}
              required
            />
          </div>
        </div>

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
                name="nip"
                placeholder=" NIP"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
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
                name="company-name"
                placeholder=" Nazwa Firmy"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
          </div>
        )}
        <form action="https://secure.payu.com/api/v2_1/orders" method="post">
          <input type="hidden" name="customerIp" value={customerIp} />
          <input type="hidden" name="extOrderId" value={txnid} />
          <input type="hidden" name="merchantPosId" value={merchantPosId} />
          <input type="hidden" name="description" value={description} />
          <input type="hidden" name="totalAmount" value={totalAmount} />
          <input type="hidden" name="currencyCode" value={currencyCode} />
          <input type="hidden" name="products[0].name" value={productName} />
          <input type="hidden" name="products[0].unitPrice" value={unitPrice} />
          <input type="hidden" name="products[0].quantity" value={quantity} />
          <input
            type="hidden"
            name="buyer.delivery.postalCode"
            value={postCode}
          />
          <input
            type="hidden"
            name="buyer.delivery.countryCode"
            value={countryCode}
          />
          <input type="hidden" name="buyer.email" value={email} />
          <input type="hidden" name="notifyUrl" value={notifyUrl} />
          <input type="hidden" name="continueUrl" value={continueUrl} />
          <input type="hidden" name="buyer.firstName" value={formFirstName} />
          <input type="hidden" name="buyer.lastName" value={formLastName} />
          <input
            type="hidden"
            name="OpenPayu-Signature"
            value={openPayuSignature}
          />
          <div className="btn-container">
            <button
              onClick={handleSave}
              type="submit"
              className="btn primary-btn"
              style={{ width: "200px" }}
              disabled={!isActiveButton}
            >
              Kup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BuyFormContainer;

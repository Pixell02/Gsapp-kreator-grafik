import { useState } from "react";
import MainFooter from "../../../components/MainFooter";
import Title from "../../../components/main-content-elements/Title";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "./MainAccount.css";
import { useCollection } from "../../../hooks/useCollection";
import verified from "../../../img/verified.png";
import discard from "../../../img/discard.png";
import { Link } from "react-router-dom";
import CountryOption from "../../Offer/components/countryOption";
import { auth, db } from "../../../firebase/config";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import useUserInformation from "../../../hooks/useUserInformation";

const zipCodeRegex = /^\d{2}-\d{3}$/;
const nipRegex = /^[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{3}$/;

function MainAccount() {
  const { user } = useAuthContext();
  const [userId, setUserId] = useState(user.uid);
  const { usersEmail, userCreatedAt } = useUserInformation(user.uid);
  const { documents: userData } = useCollection("userData", [
    "uid",
    "==",
    user.uid,
  ]);
  const [userEmail, setUserEmail] = useState(user.email);
  const [isChecked, setIsChecked] = useState(false);
  const { documents: License } = useCollection("user", ["uid", "==", user.uid]);

  const { documents: Transactions } = useCollection("transaction", [
    "uid",
    "==",
    user.uid,
  ]);

  useEffect(() => {
    if (Transactions) {
      if (Transactions.length > 0) {
        const ref = doc(db, "transaction", Transactions[0].id);
        deleteDoc(ref);
      }
    }
  }, [Transactions]);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [postCode, setPostCode] = useState();
  const [country, setCountry] = useState("Afghanistan");
  const [countryCode, setCountryCode] = useState("AF");
  const [city, setCity] = useState();
  const [nip, setNip] = useState();
  const [companyName, setCompanyName] = useState();
  const [postCodeError, setPostCodeError] = useState("");
  const [nipError, setNipError] = useState("");

  const validatePostCode = (postCode) => {
    if (!zipCodeRegex.test(postCode)) {
      setPostCodeError("Niepoprawny kod pocztowy");
      return false;
    }
    setPostCodeError("");
    return true;
  };
  const validateNip = (nip) => {
    if (!nipRegex.test(nip)) {
      setNipError("Niepoprawny nip");
      return false;
    }
    setNipError("");
    return true;
  };
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
        } else {
          setNip("");
          setCompanyName("");
        }
      }
    } else {
      setFirstName("");
      setLastName("");
      setAddress("");
      setPostCode("");
      setCity("");
      setNip("");
      setCompanyName("");
    }
  }, [userData]);

  const handleChange = (e) => {
    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    } else if (e.target.name === "lastName") {
      setLastName(e.target.value);
    } else if (e.target.name === "adress") {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nip) {
      const userRef = doc(db, "userData", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        address: address,
        postCode: postCode,
        city: city,
        country: country,
      });
    } else {
      const userRef = doc(db, "userData", user.uid);
      await setDoc(userRef, {
        country: country,
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        address: address,
        postCode: postCode,
        city: city,
        NIP: nip,
        companyName: companyName,
      });
    }
  };

  return (
    <div className="main-content">
      <div className="ml-5">
        <div className="account-content">
          <Title title="Konto" />
          <div className="account-items">
            <label>Id konta</label>
            <div className="userId account-data-container">
              <span className="account-data">{userId} </span>
            </div>
            {userEmail && (
              <>
                <label>E-mail</label>
                <div className="userEmail account-data-container">
                  <span className="account-data">{userEmail}</span>
                </div>
              </>
            )}
            <label>Data utworzenia konta</label>
            <div className="userId account-data-container">
              <span className="account-data">{userCreatedAt} </span>
            </div>

            {License && License[0].license == "free-trial" && (
              <div className="license-container">
                <div className="license-content">
                  <img src={verified} className="icon-verified" />{" "}
                  <span>
                    Masz jeszcze {License[0].numberOfFreeUse} darmowych użyć
                  </span>
                </div>
              </div>
            )}
            {License && License[0].license == "no-license" && (
              <div className="license-container">
                <div className="license-content">
                  <img src={discard} className="icon-verified" />{" "}
                  <span>
                    Twoja licencja skończyła się{" "}
                    <Link to="/offer">Kup dostęp</Link>
                  </span>
                </div>
              </div>
            )}
            {License && License[0].license === "full-license" && (
              <div className="license-container ">
                <p style={{ marginLeft: "20px" }}>Licencja</p>
                <div className="license-type">
                  <label>Typ licencji</label>
                  <input
                    type="text"
                    className="license-content"
                    value="UNLIMITED"
                    disabled
                  />
                </div>
                <div className="license-type">
                  <label>Data wygaśnięcia</label>
                  <input
                    type="text"
                    className="license-content"
                    value={License[0].expireDate}
                    disabled
                  />
                </div>
                <label>Format MM-DD-YYYY</label>
              </div>
            )}
            <form onSubmit={handleSubmit} className="fax-container">
              <p className="form-title">Dane do faktury</p>
              <div className="inner-content-country-label">
                <div className="label-content">
                  <label className="country">
                    Państwo<span style={{ color: "red" }}>*</span>
                  </label>

                  <select
                    id="country"
                    name="country"
                    className="form-control"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  >
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Åland Islands">Åland Islands</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">
                      Antigua and Barbuda
                    </option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">
                      Bosnia and Herzegovina
                    </option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">
                      British Indian Ocean Territory
                    </option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">
                      Central African Republic
                    </option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">
                      Cocos (Keeling) Islands
                    </option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo, The Democratic Republic of The">
                      Congo, The Democratic Republic of The
                    </option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote D'ivoire">Cote D'ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">
                      Dominican Republic
                    </option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Malvinas)">
                      Falkland Islands (Malvinas)
                    </option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">
                      French Southern Territories
                    </option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-bissau">Guinea-bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">
                      Heard Island and Mcdonald Islands
                    </option>
                    <option value="Holy See (Vatican City State)">
                      Holy See (Vatican City State)
                    </option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran, Islamic Republic of">
                      Iran, Islamic Republic of
                    </option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea, Democratic People's Republic of">
                      Korea, Democratic People's Republic of
                    </option>
                    <option value="Korea, Republic of">
                      Korea, Republic of
                    </option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People's Democratic Republic">
                      Lao People's Democratic Republic
                    </option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">
                      Libyan Arab Jamahiriya
                    </option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="Macedonia, The Former Yugoslav Republic of">
                      Macedonia, The Former Yugoslav Republic of
                    </option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia, Federated States of">
                      Micronesia, Federated States of
                    </option>
                    <option value="Moldova, Republic of">
                      Moldova, Republic of
                    </option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">
                      Netherlands Antilles
                    </option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">
                      Northern Mariana Islands
                    </option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestinian Territory, Occupied">
                      Palestinian Territory, Occupied
                    </option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">
                      Russian Federation
                    </option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Kitts and Nevis">
                      Saint Kitts and Nevis
                    </option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Pierre and Miquelon">
                      Saint Pierre and Miquelon
                    </option>
                    <option value="Saint Vincent and The Grenadines">
                      Saint Vincent and The Grenadines
                    </option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">
                      Sao Tome and Principe
                    </option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and The South Sandwich Islands">
                      South Georgia and The South Sandwich Islands
                    </option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">
                      Svalbard and Jan Mayen
                    </option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">
                      Syrian Arab Republic
                    </option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania, United Republic of">
                      Tanzania, United Republic of
                    </option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-leste">Timor-leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">
                      Trinidad and Tobago
                    </option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands">
                      Turks and Caicos Islands
                    </option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">
                      United States Minor Outlying Islands
                    </option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="Virgin Islands, British">
                      Virgin Islands, British
                    </option>
                    <option value="Virgin Islands, U.S.">
                      Virgin Islands, U.S.
                    </option>
                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>
              </div>
              <div className="fullName-content">
                <div className="inner-label-containers">
                  <div className="label-content">
                    <label>Imię</label>
                    <span style={{ color: "red" }}>*</span>
                  </div>
                  <input
                    value={firstName}
                    type="text"
                    className="name"
                    name="firstName"
                    placeholder=" Imię"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="label-content">
                  <div className="inner-label-containers">
                    <label>Nazwisko</label>
                    <span style={{ color: "red" }}>*</span>
                  </div>
                  <input
                    value={lastName}
                    type="text"
                    className="surName"
                    name="lastName"
                    placeholder=" Nazwisko"
                    onChange={handleChange}
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
                    value={address}
                    className="adress"
                    name="adress"
                    placeholder=" Adres"
                    onChange={handleChange}
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
                    value={postCode}
                    className="post-code"
                    name="post-code"
                    placeholder=" Kod pocztowy"
                    onChange={handleChange}
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
                    className="city"
                    value={city}
                    placeholder=" Miasto"
                    name="city"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div
                className="checkbox-container"
                style={{ marginBottom: "20px" }}
              >
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
                      className="nip"
                      value={nip}
                      name="nip"
                      placeholder=" NIP"
                      onChange={handleChange}
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
                      value={companyName}
                      className="company-name"
                      name="company-name"
                      placeholder=" Nazwa Firmy"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}
              <div className="btn-container">
                <button className="btn btn-primary save-btn" type="submit">
                  Zapisz{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainAccount;

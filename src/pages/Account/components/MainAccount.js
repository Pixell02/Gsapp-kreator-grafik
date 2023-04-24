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
import { countries } from "./countries";
import Licenses from "./Licenses";
import UserInformation from "./UserInformation";

const zipCodeRegex = /^\d{2}-\d{3}$/;
const nipRegex = /^[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{3}$/;

function MainAccount() {
  const { user } = useAuthContext();
  const { usersEmail, userCreatedAt } = useUserInformation(user.uid);
  const { documents: userData } = useCollection("userData", ["uid", "==", user.uid]);
  const [userEmail, setUserEmail] = useState(user.email);
  const [isChecked, setIsChecked] = useState(false);
  const { documents: License } = useCollection("user", ["uid", "==", user.uid]);
  

  const { documents: Transactions } = useCollection("transaction", ["uid", "==", user.uid]);

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
            <UserInformation user={user} userEmail={userEmail} userCreatedAt={userCreatedAt} />
            
            <Licenses License={License} />

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
                    {countries.map((item) => (
                      <option value={item.label}>{item.value}</option>
                    ))}
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
              <div className="checkbox-container" style={{ marginBottom: "20px" }}>
                <label>
                  <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
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

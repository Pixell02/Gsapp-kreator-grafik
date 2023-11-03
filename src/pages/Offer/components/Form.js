import React, { useContext, useEffect, useState } from "react";
import "./MainContentOffer.css";
import { countries } from "./countries";
import Input from "./Input";
import translate from "../locales/translate.json";
import { LanguageContext } from "../../../context/LanguageContext";
import useCheckActiveButton from "../hooks/useCheckActiveButton";
import { getFunctions, httpsCallable } from "firebase/functions";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";


export default function Form({
  paymentData,
  handleChange,
  handleDataChange,
  handleDeliveryDataChange,
  isChecked,
  setIsChecked,
}) {
  const isActiveButton = useCheckActiveButton(paymentData, isChecked);
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useContext(LanguageContext);
  const functions = getFunctions();
  const payUPayment = httpsCallable(functions, "PayUPayment");
  const createTransactionInfo = httpsCallable(functions, "createTransactionInfo");

  const handleSave = async () => {
    setIsLoading(true);
   
    try {
      const res = await createTransactionInfo({
        user: {
          email: user.email,
          uid: user.uid
      }});
      const { data } = await payUPayment(paymentData);
      
      
      const url = new URL(data);
      const searchParams = new URLSearchParams(url.search);
      const orderId = searchParams.get("orderId");
      const orderRef = doc(db, "orderId", user.uid);
      setDoc(orderRef, {
        orderId: orderId,
        uid: user.uid,
      });
      
      window.location.href = data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (paymentData.companyName) {
      setIsChecked(true);
    }
  }, [paymentData.companyName, setIsChecked]);


  return (
    <>
      <div className="fax-container">
        <p className="form-title">{translate.billing[language]}</p>

        <select
          name="countryCode"
          className="form-control"
          value={paymentData.buyer.delivery.countryCode}
          onChange={(e) => handleDeliveryDataChange(e)}
          required
        >
          {countries.map((country, i) => (
            <option key={i} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>

        <div className="fullName-content">
          <Input
            key={1}
            title={translate.firstName[language]}
            name="firstName"
            value={paymentData.buyer.firstName}
            handleDataChange={(e) => handleDataChange(e)}
          />
          <Input
            key={2}
            title={translate.lastName[language]}
            name="lastName"
            value={paymentData.buyer.lastName}
            handleDataChange={(e) => handleDataChange(e)}
          />
        </div>

        <Input
          key={3}
          title={translate.email[language]}
          name="email"
          value={paymentData.buyer.email}
          handleDataChange={(e) => handleDataChange(e)}
        />

        <Input
          key={4}
          title={translate.street[language]}
          name="street"
          value={paymentData.buyer.delivery.street}
          handleDataChange={(e) => handleDeliveryDataChange(e)}
        />

        <Input
          key={5}
          title={translate.postalCode[language]}
          name="postalCode"
          value={paymentData.buyer.delivery.postalCode}
          handleDataChange={(e) => handleDeliveryDataChange(e)}
        />

        <Input
          key={6}
          title={translate.city[language]}
          name="city"
          value={paymentData.buyer.delivery.city}
          handleDataChange={(e) => handleDeliveryDataChange(e)}
        />
        <div className="checkbox-container" style={{ marginBottom: "20px" }}>
          <label>
            <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
            <span>{translate.companyData[language]}</span>
          </label>
        </div>
        {isChecked && (
          <div className="data-content">
            <Input
              key={7}
              title={translate.vatId[language]}
              name="NIP"
              value={paymentData.NIP}
              handleDataChange={(e) => handleChange(e)}
            />
            <Input
              key={8}
              title={translate.companyName[language]}
              name="companyName"
              value={paymentData.companyName}
              handleDataChange={(e) => handleChange(e)}
            />
          </div>
        )}
        <button
          onClick={handleSave}
          type="submit"
          className="btn primary-btn"
          style={{ width: "200px" }}
          disabled={!isActiveButton}
        >
          {translate.buy[language]}
        </button>
        {isLoading && <p>...{translate.loading[language]}</p>}
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import "./MainContentOffer.css";
import usePaymentData from "../hooks/usePaymentData";
import Form from "./Form";
import ProductsContainer from "./ProductsContainer";
import { getFunctions, httpsCallable } from "firebase/functions";
import useProducts from "../hooks/useProducts";
import usePromoCode from "../hooks/usePromoCode";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

function BuyFormContainer() {
  const { user } = useAuthContext();
  const { documents: userData } = useCollection("userData", ["uid", "==", user.uid]);
  const [isLoading, setIsLoading] = useState(false);
  const { paymentData, handleChange, handleDataChange, handleDeliveryDataChange, setPaymentData } =
    usePaymentData(userData);
  const { radioType, products, setProducts, setRadioType, unitPrice, setUnitPrice, isChecked, setIsChecked, handleCheckboxChange } =
    useProducts(setPaymentData);
  const { promoCode, alert, handleUseCode, usedCode, setUsedCode} = usePromoCode()
  const functions = getFunctions();

  const payUPayment = httpsCallable(functions, "PayUPayment");

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { data } = await payUPayment(paymentData);
      const url = new URL(data);
      const searchParams = new URLSearchParams(url.search);
      const orderId = searchParams.get("orderId");
      const orderRef = doc(db, "orderId", user.uid);
      setDoc(orderRef, {
        orderId: orderId,
        uid:user.uid
      });
      window.location.href = data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <ProductsContainer
        radioType={radioType}
        setRadioType={setRadioType}
        paymentData={paymentData}
        unitPrice={unitPrice}
        setUnitPrice={setUnitPrice}
        handleCheckboxChange={handleCheckboxChange}
        promoCode={promoCode}
        alert={alert}
        handleUseCode={handleUseCode}
        usedCode={usedCode}
        setUsedCode={setUsedCode}
        products={products}
        setProducts={setProducts}
      />
      <div className="fax-container">
        <Form
          handleSave={handleSave}
          handleChange={handleChange}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          paymentData={paymentData}
          handleDataChange={handleDataChange}
          handleDeliveryDataChange={handleDeliveryDataChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default BuyFormContainer;

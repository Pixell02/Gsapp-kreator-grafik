import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import "./MainContentOffer.css";
import usePaymentData from "../hooks/usePaymentData";
import Form from "./Form";
import ProductsContainer from "./ProductsContainer";
import { getFunctions, httpsCallable } from "firebase/functions";

function BuyFormContainer() {
  // const [price, setPrice] = useState(1);
  const { user } = useAuthContext();
  const { documents: userData } = useCollection("userData", ["uid", "==", user.uid]);
  const [isLoading, setIsLoading] = useState(false)
  const { paymentData, handleChange, handleDataChange, handleDeliveryDataChange, setPaymentData } =
    usePaymentData(userData);

  // const [txnid, setTxnid] = useState(Date.now());
  const [products, setProducts] = useState([]);
  const [unitPrice, setUnitPrice] = useState("5000");
  const [isChecked, setIsChecked] = useState(false);
  const [radioType, setRadioType] = useState("Licencja MAX 1 miesiąc");

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    if (checked) {
      if (e.target.name === "Licencja MAX 1 miesiąc") {
        setProducts((prevProducts) => [{ name: e.target.name, unitPrice: e.target.value }]);
        setPaymentData((prev) => ({
          ...prev,
          description: "Licencja",
          products: [{ [e.target.name]: e.target.value }],
        }));
      } else {
        setProducts((prevProducts) => prevProducts.filter((product) => product.name !== "Licencja MAX 1 miesiąc"));

        setPaymentData((prev) => ({
          ...prev,
          description: "Usługi graficzne",
          products: [{ [e.target.name]: e.target.value }],
        }));
        setProducts((prevProducts) => prevProducts.filter((product) => product.name !== "other"));

        // setDescription("Usługi graficzne");
        setProducts((prevProducts) => [...prevProducts, { name, unitPrice: parseFloat(value) }]);
      }
    } else {
      setProducts((prevProducts) => prevProducts.filter((product) => product.name !== name));
    }
  };
  useEffect(() => {
    if (products.length === 0) {
      products.push({ name: "Licencja MAX 1 miesiąc", unitPrice: "5000" });
    }
  }, []);

  useEffect(() => {
    let price = 0;

    const updatedProducts = products.map((product) => {
      price += Number(product.unitPrice);
      return { name: product.name, unitPrice: product.unitPrice, quantity: "1" };
    });

    setPaymentData((prev) => ({
      ...prev,
      totalAmount: price,
      products: updatedProducts,
    }));
  }, [products, radioType]);

  useEffect(() => {
    setPaymentData((prev) => ({
      ...prev,
      totalAmount: unitPrice,
    }));
    // setTotalAmount(unitPrice);
  }, [unitPrice]);

  const functions = getFunctions();

  const payUPayment = httpsCallable(functions, "PayUPayment");

  // wywołujemy funkcję Firebase Functions

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { data } = await payUPayment(paymentData);
      const url = new URL(data);
      const searchParams = new URLSearchParams(url.search);
      const orderId = searchParams.get("orderId");
      localStorage.setItem("orderId", orderId);
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

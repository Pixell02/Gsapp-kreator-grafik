import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import "./MainContentOffer.css";
import usePaymentData from "../hooks/usePaymentData";
import Form from "./Form";
import ProductsContainer from "./ProductsContainer";
import useProducts from "../hooks/useProducts";
import PromoCodeInformation from "./PromoCodeInformation";

function BuyFormContainer() {
  const { user } = useAuthContext();
  const { documents: userData } = useCollection("userData", ["uid", "==", user.uid]);
  const { paymentData, handleChange, handleDataChange, handleDeliveryDataChange, setPaymentData } =
    usePaymentData(userData);
  const { radioType, products, setProducts, setRadioType, isChecked, setIsChecked, handleCheckboxChange } =
    useProducts(setPaymentData);

  return (
    <div className="form-container">
      <ProductsContainer
        radioType={radioType}
        setRadioType={setRadioType}
        paymentData={paymentData}
        handleCheckboxChange={handleCheckboxChange}
        products={products}
        setProducts={setProducts}
      />
      <PromoCodeInformation />
      <div className="fax-container">
        <Form
          handleChange={handleChange}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          paymentData={paymentData}
          handleDataChange={handleDataChange}
          handleDeliveryDataChange={handleDeliveryDataChange}
        />
      </div>
    </div>
  );
}

export default BuyFormContainer;

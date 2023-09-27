import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import shortid from "shortid";
import { db } from "../../../../firebase/config";

const usePromoCode = () => {
  const [promoCode, setPromoCode] = useState({
    code: "",
    percentage: null,
    amount: 1,
    products: 1,
    expireDate: 1,
  });
  const [generatedCode] = useState(shortid.generate().substring(0, 6));

  const handleChange = (e) => {
    const { value, className } = e.target;
    setPromoCode((prev) => ({ ...prev, [className]: value }));
  };
  const handleOptionChange = (value) => {
    setPromoCode((prev) => ({ ...prev, products: value }));
  };

  const handleSave = () => {
    const ref = collection(db, "promoCode");
    addDoc(ref, {
      code: promoCode.code ? promoCode.code : generatedCode,
      percentage: promoCode.percentage,
      amount: promoCode.amount,
      products: promoCode.products,
      expireDate: promoCode.expireDate !== 0 ? promoCode.expireDate : null,
    });
    setPromoCode((prev) => ({
      ...prev,
      code: "",
      percentage: null,
      amount: 1,
      expireDate: 1,
    }));
  };
  return { promoCode, handleChange, handleSave, handleOptionChange };
};

export default usePromoCode;

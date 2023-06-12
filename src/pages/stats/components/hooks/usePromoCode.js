import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../../firebase/config";
import shortid from 'shortid';


const usePromoCode = () => {
  const [promoCode, setPromoCode] = useState({
    code: "",
    percentage: null,
    amount: 1,
    products: 1
  });
  const [generatedCode] = useState(shortid.generate().substring(0, 6));
  

  const handleChange = (e) => {
    const { value, className } = e.target
    setPromoCode(prev => ({ ...prev, [className]: value }))
  }
  const handleOptionChange = (value) => {
    setPromoCode(prev => ({...prev, products: value}))
  }

  const handleSave = () => {
    const ref = collection(db, "promoCode");
    addDoc(ref, {
      code: promoCode.code ? promoCode.code : generatedCode,
      percentage: promoCode.percentage,
      amount: promoCode.amount,
      products: promoCode.products

    })
  }

  return { promoCode, handleChange, handleSave, handleOptionChange }

}

export default usePromoCode;
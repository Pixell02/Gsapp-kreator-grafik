import { useEffect, useState } from "react";
import usePromoCodeContext from "./usePromoCodeContext";

const useProducts = (setPaymentData) => {
  const [products, setProducts] = useState([{ name: "Licencja MAX 1 miesiąc", unitPrice: "2800" }]);
  const { promoCode } = usePromoCodeContext();
  const [isChecked, setIsChecked] = useState(false);
  const [radioType, setRadioType] = useState("Licencja MAX 1 miesiąc");

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    if (checked) {
      setProducts([{ name: name, unitPrice: value }]);
      setPaymentData((prev) => ({
        ...prev,
        description: "Licencja",
        products: [{ [name]: value }],
      }));
    }
  };

  useEffect(() => {
    let price = 0;
    const updatedProducts = products.map((product) => {
      price += promoCode?.percentage
      ? (product.unitPrice * Number(100 - promoCode.percentage)) / 100
      : product.unitPrice;
      return {
        name: product.name,
        unitPrice: promoCode?.percentage
          ? (product.unitPrice * Number(100 - promoCode.percentage)) / 100
          : product.unitPrice,
        quantity: "1",
      };
    });

    setPaymentData((prev) => ({
      ...prev,
      totalAmount: price,
      products: updatedProducts,
    }));
  }, [products, radioType, setPaymentData, promoCode]);

  return { radioType, setRadioType, isChecked, setIsChecked, handleCheckboxChange, products, setProducts };
};

export default useProducts;

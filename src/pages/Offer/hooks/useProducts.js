import React, { useEffect, useState } from "react";



const useProducts = (setPaymentData) => {
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
  }, [unitPrice]);

  return {radioType, setRadioType, unitPrice, setUnitPrice, isChecked, setIsChecked, handleCheckboxChange, products, setProducts}
}

export default useProducts;
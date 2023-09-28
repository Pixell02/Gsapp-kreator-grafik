import { useEffect, useState } from "react";

const useTotalPrice = (ordersData) => {
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    if (ordersData?.length > 0) {
      const suma = ordersData.reduce((acc, item) => {
        if (item.products && Array.isArray(item.products)) {
          const subtotal = item.products.reduce((subAcc, product) => {
            if (product.unitPrice) {
              const unitPrice = parseFloat(product.unitPrice) / 100; // Zamiana na liczbę i podzielenie przez 100
              return subAcc + unitPrice;
            }
            return subAcc;
          }, 0);
          return acc + subtotal;
        }
        return acc;
      }, 0);

      setTotalPrice(suma); // Ustawienie wyniku sumy w stanie
    } else {
      setTotalPrice(0); // Ustawienie wyniku na 0, jeśli nie ma danych
    }
  }, [ordersData]);
  console.log(totalPrice);
  return totalPrice;
};

export default useTotalPrice;

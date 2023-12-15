import React, { useEffect, useState } from 'react'

const useCheckActiveButton = (paymentData, isChecked) => {

  const [isActiveButton, setActiveButton] = useState(false);

  const zipCodeRegex = /^\d{2}-\d{3}$/;
const nipRegex = /^\d{10}$/;

  useEffect(() => {
    if (isChecked) {
      if (
        !nipRegex.test(paymentData.NIP) ||
        !paymentData.companyName ||
        !paymentData.buyer.firstName ||
        !paymentData.buyer.lastName ||
        !paymentData.buyer.delivery.city ||
        !paymentData.buyer.delivery.street ||
        !paymentData.buyer.email ||
        !zipCodeRegex.test(paymentData.buyer.delivery.postalCode)
      ) {
        setActiveButton(false);
      } else {
        setActiveButton(true);
      }
    } else if (!isChecked) {
      if (
        !paymentData.buyer.firstName ||
        !paymentData.buyer.lastName ||
        !paymentData.buyer.delivery.city ||
        !paymentData.buyer.delivery.street ||
        !zipCodeRegex.test(paymentData.buyer.delivery.postalCode)
      ) {
        setActiveButton(false);
      } else {
        setActiveButton(true);
      }
    }
    
  }, [paymentData, isChecked, zipCodeRegex, nipRegex]);

  
  return isActiveButton;
}

export default useCheckActiveButton

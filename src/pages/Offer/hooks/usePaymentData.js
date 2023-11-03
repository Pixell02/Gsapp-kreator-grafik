import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { countries } from '../components/countries';

const usePaymentData = (userData) => {
  
  const { user } = useAuthContext();
  
  
  const [paymentData, setPaymentData] = useState({
    totalAmount: "",
    extOrderId: Date.now().toString(),
    description: "Licencja",
    products: [],
    buyer: {
      firstName: '',
      lastName: '',
      email: user.email,
      delivery: {
        street: '',
        postalCode: '',
        city: '',
        countryCode: 'PL'
      }
    }
  });
  useEffect(() => {
    if (userData && userData.length > 0) {
      const selectedCountry = countries.find(country => country.label === userData[0].country);
      if (selectedCountry) {
        const updatedPaymentData = {
          NIP: userData[0].NIP,
          companyName: userData[0].companyName,
          buyer: {
            ...paymentData.buyer,
            firstName: userData[0].firstName,
            lastName: userData[0].lastName,
            email: user.email,
            delivery: {
              ...paymentData.buyer.delivery,
              street: userData[0].address,
              postalCode: userData[0].postCode,
              city: userData[0].city,
              countryCode: selectedCountry.value
            }
          }
        };
        setPaymentData(prev => ({
          ...prev,
          ...updatedPaymentData
        }) );
      }
    }
  }, [userData, user]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prevPaymentData => ({
      ...prevPaymentData,
      buyer: {
        ...prevPaymentData.buyer,
        [name]: value
      }
    }));
    };
    const handleDeliveryDataChange = (e) => { 
      const { name, value } = e.target;
      setPaymentData(prevPaymentData => ({
        ...prevPaymentData,
        buyer: {
          ...prevPaymentData.buyer,
          delivery: {
            ...prevPaymentData.buyer.delivery,
            [name]: value
          }
        }
      }));
    }

  return { paymentData, handleChange, handleDataChange, handleDeliveryDataChange, setPaymentData };
};

export default usePaymentData;

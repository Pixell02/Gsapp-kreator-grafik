import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { countries } from '../components/countries'

const usePaymentData = (userData) => {
  
  const { user } = useAuthContext()
  // Creating payment data state
  const [paymentData, setPaymentData] = useState({
    totalAmount: "",
    extOrderId: Date.now().toString(),
    description: "Licencja",
    products: [],
    buyer: {
      firstName: '',
      lastName: '',
      email: '',
      delivery: {
        street: '',
        postalCode: '',
        city: '',
        countryCode: 'PL'
      }
    }
  })

  
  useEffect(() => {
    if (userData) {
      if (userData.length > 0) {
        countries.forEach(country => {
          if (country.label === userData[0].country) {
            setPaymentData((prev) => ({
              ...prev,
              NIP: userData[0].NIP,
              companyName: userData[0].companyName,
              buyer: {
                firstName: userData[0].firstName,
                lastName: userData[0].lastName,
                email: user.email,
                delivery: {
                  street: userData[0].address,
                  postalCode: userData[0].postCode,
                  city: userData[0].city,
                  countryCode: country.value
                }
              }

            }));
          }
        })
      }
    }
  },[userData, user])

 // Creating arrow function to hold payment data
  
  const handleChange = (e) => {
    const { name, value} = e.target
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  }

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

  return {paymentData, handleChange, handleDataChange, handleDeliveryDataChange, setPaymentData}

}



export default usePaymentData


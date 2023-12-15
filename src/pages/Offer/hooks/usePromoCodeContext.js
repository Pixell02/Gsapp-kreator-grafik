import React, { useContext } from 'react'
import { PromoCodeContext } from '../context/PromoCodeContext';

const usePromoCodeContext = () => {

  const context = useContext(PromoCodeContext);
  if (!context) {
    throw Error("PromoCode context")
  }

  return context;
}

export default usePromoCodeContext

import React from 'react'
import { useContext } from 'react'
import { PromoCodeContext } from '../context/PromoCodeContext'

const usePromoCodeContext = () => {
  
  const context = useContext(PromoCodeContext);
  if (!context) {
    throw Error("PromoCodeContext ")
  }
  return context
}

export default usePromoCodeContext

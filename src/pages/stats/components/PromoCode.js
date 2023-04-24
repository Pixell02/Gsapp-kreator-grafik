import React from 'react'
import "./promoCode.css"

export default function PromoCode() {
  return (
    <div className='promoCode-container w-25'>
      <p>Kody promocyjne</p> jeszcze nie działa
      <div className='d-flex flex-row'>
        <input type="number" />
        <button className='btn'>Generuj</button>
      </div>
      <div className='promoCode-content'>
        <div className='code-value'></div>
        <div className='percentage-value'></div>
      </div>
    </div>
  )
}

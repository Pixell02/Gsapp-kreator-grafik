import React, { useState } from "react";
import usePromoCode from "./hooks/usePromoCode";
import "./promoCode.css";
import { useCollection } from "../../../hooks/useCollection";
import Select from "react-select";

export default function PromoCode() {
  const { promoCode, handleChange, handleSave, handleOptionChange } = usePromoCode();
  const { documents: codes } = useCollection("promoCode");
  const options = [
    { label: "licencja", value: 1 },
    { label: "usługi", value: 2 },
    { label: "grafika dzień meczowy", value: 3 },
    { label: "grafika zapowiedź meczu", value: 4 },
    { label: "grafika gool", value: 5 },
    { label: "grafika skład wyjściowy", value: 6 },
    { label: "grafika wynik", value: 7 },
    { label: "wycinanie herbów", value: 8 },
    { label: "wycinanie zawodników", value: 9 },
  ];
  
  return (
    <div className="promoCode-container w-75">
      <p>Kody promocyjne</p>
      <div className="d-flex flex-row">
        <div className="ml-2">
          <label>kod (opcjonalne)</label>
          <input
            type="text"
            className="code"
            value={promoCode.code}
            onChange={(e) => handleChange(e)}
            placeholder="kod promocyjny"
          />
        </div>
        <div className="ml-2">
          <label>ilość %</label>
          <input
            type="number"
            placeholder="ilość %"
            className="percentage"
            onChange={(e) => handleChange(e)}
            value={promoCode.percentage}
          />
        </div>
        <div className="ml-2">
          <label>Sztuki</label>
          <input
            type="number"
            placeholder="sztuk"
            className="amount"
            onChange={(e) => handleChange(e)}
            value={promoCode.amount}
          />
        </div>
        <div className="ml-2 w-50">
          <label>produkt</label>
          <Select options={options} className="products" onChange={(option) => handleOptionChange(option.value)} />
        </div>
        <button onClick={() => handleSave()} className="btn">
          Generuj
        </button>
      </div>
      <div className="promoCode-content overflow-auto h-50">
        <div className="code-container">
          <div className="code-value">kod</div>
          <div className="percentage-value">ilość %</div>
          <div className="amount-value">ilość</div>
          <div className="product">produkt</div>
        </div>
        {codes &&
          codes.map((item) => (
            <div className="code-container">
              <div className="code-value">{item.code}</div>
              <div className="percentage-value">{item.percentage}%</div>
              <div className="amount-value">{item.amount}</div>
              <div className="product">{item.products ? item.products : null}</div>
            </div>
          ))}
      </div>
      <div className="w-100">1.licencja, 2.usługi, 3.grafika dzień meczowy, 4.grafika zapowiedź meczu, 5.grafika gool, 6.grafika skład wyjścowy, 7.grafika wynik, 8.wycinanie herbów, 9.wycinanie zawodników</div>
    </div>
  );
}

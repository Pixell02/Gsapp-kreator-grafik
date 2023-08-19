import React from "react";
import usePromoCode from "./hooks/usePromoCode";
import "./promoCode.css";
import { useCollection } from "../../../hooks/useCollection";
import Select from "react-select";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";

export default function PromoCode() {
  const { promoCode, handleChange, handleSave, handleOptionChange } = usePromoCode();
  const { documents: codes } = useCollection("promoCode");
  const handleDeleteDoc = (id) => {
    const docRef = doc(db, "promoCode", id);
    deleteDoc(docRef);
  };
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
  console.log(codes);

  return (
    <div className="d-flex w-100 flex-row">
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
          <div className="ml-2">
            <label>Ważność po użyciu (w miesiącach)</label>
            <input
              type="number"
              placeholder="ważność"
              className="expireDate"
              onChange={(e) => handleChange(e)}
              value={promoCode.expireDate}
            />
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
            <div className="expire-date">Okres ważności</div>
            <div className="delete-btn-container">Usuń</div>
          </div>
          {codes &&
            codes.map((item) => (
              <div className="code-container">
                <div className="code-value">{item.code}</div>
                <div className="percentage-value">{item.percentage}%</div>
                <div className="amount-value">{item.amount}</div>
                <div className="product">{item.products ? item.products : null}</div>
                <div className="expire-date">{item.expireDate ? item.expireDate : null}</div>
                <div className="delete-btn-container">
                  <button className="btn" onClick={() => handleDeleteDoc(item.id)}>
                    -
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-25 d-flex">
        <ul className="d-flex flex-column w-100 ml-5 justify-content-center">
          <b>numeracja produktów</b>
          {options.map((option, i) => (
            <li key={i}>{option.value + " " + option.label }</li>
          ))}
          <b className="mt-2">Jeżeli ważność wynosi 0 to oznacza że jest jednorazowe użycie,
          każda inna wartość przyznaje liczbę miesięcy</b>
        </ul>
        </div>
    </div>
  );
}

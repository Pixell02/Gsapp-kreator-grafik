import React from "react";
import translate from "../locales/translate.json";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { PromoCodeContext } from "../context/PromoCodeContext";

export default function CodeInput({ usedCode, setUsedCode, handleUseCode, alert }) {
  const { language } = useContext(LanguageContext);
  const { promoCode } = useContext(PromoCodeContext);
  
  return (
    <div>
      <div className="mt-5 d-flex">
        <input type="text" value={usedCode} onChange={(e) => setUsedCode(e.target.value)} placeholder={translate.discountCode[language]} />
        <button className="btn" onClick={() => handleUseCode(usedCode)} disabled={promoCode.code ? true : false}>
          {translate.use[language]}
        </button>
      </div>
      {alert && alert === "użyto pomyślnie" ? (
        <span style={{ color: "green" }}>{alert}</span>
      ) : (
        <span style={{ color: "red" }}>{alert}</span>
      )}
    </div>
  );
}

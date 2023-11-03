import React from "react";
import translate from "../locales/translate.json";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import usePromoCodeContext from "../hooks/usePromoCodeContext";

export default function CodeInput() {
  const { language } = useContext(LanguageContext);
  const { promoCode, handleUseCode, usedCode, setUsedCode, alert } = usePromoCodeContext();
  
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

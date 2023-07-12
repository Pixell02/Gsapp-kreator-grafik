import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import typeMonth from "./typeDate/typeMonth";
import translate from "../../../locales/translate.json"
import { LanguageContext } from "../../../../../context/LanguageContext";


export default function TypeMonth({ fabricRef, coords, themeOption, posterBackground }) {
  const [month, setMonth] = useState("");
  const {language} = useContext(LanguageContext)

  useEffect(() => {
    if (fabricRef.current?.backgroundImage && month !== "")
      typeMonth(fabricRef, month, themeOption, coords)
  },[fabricRef.current, themeOption, posterBackground, month]);

  return (
    <div>
      {coords && coords.typeMonth && (
        <>
          <label>{translate.typeMonth[language]}</label>
          <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} />
        </>
      )}
    </div>
  );
}

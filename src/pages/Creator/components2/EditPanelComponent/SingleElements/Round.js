import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import typeKolejka from "./typeDate/typeKolejka";
import translate from "../../../locales/translate.json";
import { LanguageContext } from "../../../../../context/LanguageContext";

export default function Round({ fabricRef, coords, themeOption, posterBackground }) {
  const { language } = useContext(LanguageContext);
  const [typeRound, setTypeRound] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setTypeRound("Kolejka");
    }, 500);
  }, [fabricRef.current?._objects]);
  useEffect(() => {
    if (fabricRef.current?._objects && typeRound !== "") {
      typeKolejka(fabricRef, typeRound, coords, themeOption);
    }
  }, [fabricRef.current, typeRound, posterBackground]);

  return (
    <>
      <label>{translate.typeRound[language]}</label>
      <input type="text" value={typeRound} onChange={(e) => setTypeRound(e.target.value)} />
    </>
  );
}

import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import typeLeague from "./typeDate/typeLeague";
import translate from "../../../locales/translate.json"
import { LanguageContext } from "../../../../../context/LanguageContext";
import useImageRefProvider from "../../../hooks/useImageRefProvider";

export default function League({ fabricRef, coords, themeOption, posterBackground }) {
  const [league, setLeague] = useState("");
  const { language } = useContext(LanguageContext);
  
  useEffect(() => {
    setTimeout(() => {
      setLeague("Liga");
    },500)
  }, [fabricRef.current?._objects]);


  useEffect(() => {
    if (fabricRef.current?._objects && league !== "") {
      typeLeague(fabricRef, league, themeOption, coords)
    }
  },[fabricRef.current, league, themeOption, posterBackground]);

  return (
    <>
      <label>{translate.typeLeague[language]}</label>
      <input type="text" value={league} onChange={e => setLeague(e.target.value)} />
    </>
  );
}

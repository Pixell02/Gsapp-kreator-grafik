import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import typePlace from './typePlace/typePlace';
import translate from "../../../locales/translate.json"
import { LanguageContext } from "../../../../../context/LanguageContext";

export default function TypePlace({ fabricRef, coords, themeOption, posterBackground }) {
  const [place, setPlace] = useState("");
  const { language } = useContext(LanguageContext)
  
  useEffect(() => {
    setTimeout(() => {
      setPlace("Boisko w");
    },500)
  }, [fabricRef.current?._objects]);

  useEffect(() => {
    if (fabricRef.current?._objects && place !== "") {
      
      typePlace(fabricRef, coords, place, themeOption)
    }
  }, [fabricRef.current, place, posterBackground]);

 
  return (
    <div>
      <label>{translate.typePlace[language] }</label>
      <input type="text" value={place} onChange={e => setPlace(e.target.value)} />
    </div>
  )
}

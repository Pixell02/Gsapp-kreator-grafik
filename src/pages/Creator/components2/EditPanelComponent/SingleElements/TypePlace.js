import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import typePlace from './typePlace/typePlace';
import translate from "../../../locales/translate.json"
import { LanguageContext } from "../../../../../context/LanguageContext";

export default function TypePlace({ fabricRef, coords, themeOption, posterBackground }) {
  const [place, setPlace] = useState("");
  const {language} = useContext(LanguageContext)
  useEffect(() => {
    if (fabricRef.current?.backgroundImage && place !== "") {
      
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

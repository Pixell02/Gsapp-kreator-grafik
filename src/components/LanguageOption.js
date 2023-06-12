import React from 'react'
import { langSelectOption } from './options'
import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

export default function LanguageOption() {

  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <div>
      <select name='langauge' value={language} onChange={(option) => changeLanguage(option.value)}>
        {langSelectOption.map((lang) => (
          <option value={lang.value}><img src={lang.label} /></option>
        ))}
        
      </select>
    </div>
  )
}

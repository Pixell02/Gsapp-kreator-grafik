import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { db } from '../../../firebase/config';

export default function ThemeAddModal({ setIsOpen, themes, selectedLangOption, selectedSportOption }) {
  
  const [themeName, setThemeName] = useState("");

  useEffect(() => {
    if (themes) {
      setThemeName(`motyw ${themes.length + 1}`);
    }
  }, [themes])
  
  const handleSaveTheme = () => {
    const docRef = collection(db, "catalog")
    addDoc(docRef, {
      lang: selectedLangOption,
      public: false,
      sport: selectedSportOption,
      theme: themeName
    })
    setIsOpen()
    
  }


  return (
    <div className='modal-container'>
      <div className='modal-window h-25 p-3'>
        <div className='title'>
         <p>Dodaj motyw</p>
        </div>
        <div className='d-flex flex-column'>
          <label className='w-100'>Nazwa motywu</label>
          <input type='text' value={themeName} onChange={(e) => setThemeName(e.target.value)} />
        </div>
        <div className='btn-container w-100 d-flex align-items-end'>
          <div className='w-100 d-flex justify-content-end'>
          <button className='btn' onClick={setIsOpen}>Anuluj</button>
          <button className='btn' onClick={() => handleSaveTheme()}>Dodaj</button>
          </div>
        </div>
      </div>
    </div>
  )
}

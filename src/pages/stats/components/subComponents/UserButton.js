import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { LanguageContext } from '../../../../context/LanguageContext';

export default function UserButton(props) {
  const navigate = useNavigate();
  const {language} = useContext(LanguageContext)
    function handleClick() {
        navigate(`/${language}/stats/${props.user}`)
    }
  return (
    <>
      <button onClick={handleClick} className='btn primary-btn'>Szczegóły</button>
    </>
  )
}

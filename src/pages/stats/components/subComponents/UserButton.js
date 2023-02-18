import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserButton(props) {
    const navigate = useNavigate();
    function handleClick() {
        navigate(`/stats/${props.user}`)
    }
  return (
    <>
      <button onClick={handleClick} className='btn primary-btn'>Szczegóły</button>
    </>
  )
}

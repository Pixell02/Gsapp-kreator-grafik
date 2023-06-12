import React from 'react'

export default function CodeInput({usedCode, setUsedCode, handleUseCode, alert}) {
  return (
    <div>
    <div className='mt-5 d-flex'>
      <input type="text" value={usedCode} onChange={(e) => setUsedCode(e.target.value)} placeholder='kod rabatowy' />
      <button className='btn' onClick={() => handleUseCode(usedCode)}>Użyj</button>
      </div>
      {alert && alert === "użyto pomyślnie" ? <span style={{color: "green"}}>{alert}</span> : <span style={{color: "red"}}>{alert}</span>}
    </div>
  )
}

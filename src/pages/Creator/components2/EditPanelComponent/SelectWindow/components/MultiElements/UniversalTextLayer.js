import React from 'react'
import useTextLayer from './hooks/useTextLayer'

const UniversalTextLayer = ({ fabricRef, coords, properties, selectedMatch }) => {
  
  const {textValue, setTextValue} = useTextLayer(fabricRef, coords, properties, selectedMatch)

  return (
    <div className='d-flex w-100 flex-column'>
      <span>{coords.className}</span>
      <input type='text' value={textValue} onChange={(e) => setTextValue(e.target.value)}  />
    </div>
  )
}

export default UniversalTextLayer

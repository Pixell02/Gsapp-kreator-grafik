import React from 'react'
import useTextBoxLayer from './hooks/useTextBoxLayer'


const TextBoxInput = ({ coords, fabricRef }) => {
  
  const {textValue, setTextValue} = useTextBoxLayer(coords, fabricRef)

  return (
    <div>
      <label>{coords.className}</label>
      <textarea value={textValue} onChange={(e) => setTextValue(e.target.value)} />
    </div>
  )
}

export default TextBoxInput

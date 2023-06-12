import React from 'react'


export default function ImageProperties({ coords, fabricRef, handleInputChange }) {
  
  return (
    <div>
      <div>Nazwa obiektu : {coords.className}</div>
      <div className='d-flex'>
      <div>X: <input type="number" value={coords.Left} className="w-50" name='Left' onChange={handleInputChange} /></div>
      <div>Y: <input type="number" value={coords.Top} className="w-50" name='Top' onChange={handleInputChange} /></div>
      </div>
      <div className='d-flex'>
        <div>sz:<input type="number" value={coords.Width} className="w-50" name='Width' onChange={handleInputChange} /></div>
        <div>w: <input type="number" value={coords.Height} className="w-50" name='Height' onChange={handleInputChange} /></div>
      </div>
    </div>
  )
}

import React from 'react'


export default function ImageProperties({ coords, fabricRef, handleInputChange }) {
  
  return (
    <div>
      <div>Nazwa obiektu : {coords.className}</div>
      <div className='d-flex'>
      <div>X: <input type="number" value={coords.left} className="w-50" name='left' onChange={handleInputChange} /></div>
      <div>Y: <input type="number" value={coords.top} className="w-50" name='top' onChange={handleInputChange} /></div>
      </div>
      <div className='d-flex'>
        <div>sz:<input type="number" value={coords.width} className="w-50" name='width' onChange={handleInputChange} /></div>
        <div>w: <input type="number" value={coords.height} className="w-50" name='height' onChange={handleInputChange} /></div>
      </div>
    </div>
  )
}

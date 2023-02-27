import React from 'react'

const layersName = [
  { name: 'pierwsza część nazwy gospodarza'},
  { name: 'druga część nazwy gospodarza'},
  { name: 'pełna nazwa gospodarza'},
  { name: 'klasa'},
  { name: 'kolejka'},
  { name: 'miejsce'},
  { name: 'data i godzina'},
]

export default function Layers() {
  console.log(layersName);
  return (
    <div className='layers'>
      {layersName && layersName.map(layer => (
        <>
        <div className='add-name-container'>
        {layer.name}
      </div>
      <div className='add-layer-btn-container'>

      </div>
      </>
      ))}
      
    </div>
  )
}

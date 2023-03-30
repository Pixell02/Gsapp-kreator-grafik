import React from 'react'
import RadioContext from '../context/radioContext'
import Radio from './Radio'

export default function EditPanel({fabricRef, coords}) {
  return (
    <RadioContext.Provider>
      {coords && coords.opponentImage && (
        <Radio fabricRef={fabricRef} coords={coords} />
      )}
    </RadioContext.Provider>
  )
}

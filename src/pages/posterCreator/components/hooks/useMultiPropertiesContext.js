import React from 'react'
import { useContext } from 'react'
import { MultiPropertiesContext } from '../../Context/MultiPropertiesContext'

export const useMultiPropertiesContext = () => {
  
  const context = useContext(MultiPropertiesContext)
  if(!context) {
    throw Error('MultiPropertiesContext')
}

  return context
}


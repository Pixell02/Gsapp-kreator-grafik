import React from 'react'
import { useState } from 'react'

const useProperties = (coords) => {
  const [properties] = useState({
    orientation: coords.orientation,
    Margin: coords.Margin
  })

  return {properties}
}

export default useProperties

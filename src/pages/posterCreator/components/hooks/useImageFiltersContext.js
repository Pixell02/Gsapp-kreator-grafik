import React, { useContext } from 'react'
import { ImageFiltersContext } from '../../Context/ImageFiltersContext'

const useImageFiltersContext = () => {

  const context = useContext(ImageFiltersContext);
  if (!context) {
    throw Error("imagecontext");
  }

  return context
}

export default useImageFiltersContext

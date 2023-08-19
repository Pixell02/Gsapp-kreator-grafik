import React, { useEffect, useState } from 'react'
import useProperties from './useProperties';
import useAddMultiplyImageAndText from './useAddMultiplyImageAndText';

const useTextLayer = (fabricRef, coords, properties, selectedMatch) => {

  const [textValue, setTextValue] = useState("");
  const { handleAddText } = useAddMultiplyImageAndText(fabricRef, selectedMatch);
  useEffect(() => {
    if(textValue !== "") handleAddText(coords, textValue, properties)
  },[textValue])

  return {textValue, setTextValue}
}

export default useTextLayer

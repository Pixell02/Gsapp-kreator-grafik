import React, { useContext, useEffect, useRef, useState } from 'react'
import { BackgroundContext } from '../../Context/BackgroundContext';

export const useAddBackground = () => {
  const { background, setBackground, image, setImage } = useContext(BackgroundContext);
  
  const [addedBackground, setAddedBackground] = useState()
  const fileInputRef = useRef(null);

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleAddBackground = (file) => {
    if (file) {
      setImage(file)
      setAddedBackground(file);
    } else {
      setAddedBackground(null)
    }
  }

  useEffect(() => {
    if (addedBackground) { 
    const reader = new FileReader();
    reader.onloadend = () => {
      setBackground(reader.result)
    }
    reader.readAsDataURL(addedBackground)
  }
  }, [addedBackground])


  return {background, handleAddBackground, onButtonClick, fileInputRef, image}
}

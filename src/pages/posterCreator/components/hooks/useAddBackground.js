import React, { useContext, useRef } from 'react'
import { BackgroundContext } from '../../Context/BackgroundContext';
import useFabric from './useFabric';

export const useAddBackground = (fabricRef) => {
  const { image, setImage } = useContext(BackgroundContext);
  const fileInputRef = useRef(null);
  const { initFabric } = useFabric();
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleAddBackground = (file) => {
    if (file) {
      setImage(prev => ({
        ...prev,
        file,
        color: file.name.split('.')[0],
        src: URL.createObjectURL(file)
      }))
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const image = {
          src: img.src,
          width: img.width,
          height: img.height,
          color: file.name.split('.')[0],
        }
        initFabric(fabricRef, image)
      }
      
      
    } 
  }

  


  return {handleAddBackground, onButtonClick, fileInputRef, image}
}

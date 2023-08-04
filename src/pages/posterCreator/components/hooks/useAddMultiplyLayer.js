import React from 'react';
import { fabric } from 'fabric';
import { useMultiPropertiesContext } from './useMultiPropertiesContext';

const useAddMultiplyLayer = (fabricRef) => {

  const { properties, setProperties } = useMultiPropertiesContext();

  const handleCreateImage = (image, object) => {
    
    const loadedImage = (img) => {
      img.set({
        top: properties.orientation === "vertically" ? object.top + properties.Margin : object.top,
        left: properties.orientation === "horizontally" ? object.left + properties.Margin : object.left,
        className: object.className,
        originX: 'center',
        originY: 'center',
        type: 'multiplyimage',
        index: object.index + 1,
        selectable: false
      });
      img.scaleToHeight(150);
      fabricRef.current.add(img);
      fabricRef.current.renderAll();
    }

    fabric.Image.fromURL(image, (img) => loadedImage(img));
  }

  const handleCreateText = () => {

  }

  return {handleCreateImage, handleCreateText}
  
}

export default useAddMultiplyLayer

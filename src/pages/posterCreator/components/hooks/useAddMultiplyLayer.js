import React from 'react';
import { fabric } from 'fabric';
import { useMultiPropertiesContext } from './useMultiPropertiesContext';

const useAddMultiplyLayer = (fabricRef) => {

  const { properties } = useMultiPropertiesContext();

  console.log(properties)

  const handleCreateImage = (image, object) => {
    
    const loadedImage = (img) => {
      img.set({
        top: properties.orientation === "vertically" ? parseFloat(object.top + properties.Margin) : parseFloat(object.top),
        left: properties.orientation === "horizontally" ? parseFloat(object.left + properties.Margin) : parseFloat(object.left),
        className: object.className,
        originX: 'center',
        originY: 'center',
        scaleX: object.scaleX,
        scaleY: object.scaleY,
        type: 'multiplyimage',
        index: object.index + 1,
        selectable: false
      });
      fabricRef.current.add(img);
      fabricRef.current.renderAll();
    }

    fabric.Image.fromURL(image, (img) => loadedImage(img));
  }

  const handleCreateText = (innerText, object) => {
    const text = new fabric.Text(innerText, {
      top: properties.orientation === "vertically" ? parseFloat(object.top + properties.Margin) : parseFloat(object.top),
      left: properties.orientation === "horizontally" ? parseFloat(object.left + properties.Margin) : parseFloat(object.left),
      className: object.className,
      originX: object.originX,
      originY: object.originY,
      fontFamily: object.fontFamily,
      scaleX: object.scaleX,
      scaleY: object.scaleY,
      type: 'multiplyText',
      index: object.index + 1,
      selectable: false
    });
    fabricRef.current.add(text);
    fabricRef.current.renderAll();
  }

  const handleCreateUniversalText = (innerText, object) => {
    const text = new fabric.Text(innerText, {
      top: properties.orientation === "vertically" ? parseFloat(object.top + properties.Margin) : parseFloat(object.top),
      left: properties.orientation === "horizontally" ? parseFloat(object.left + properties.Margin) : parseFloat(object.left),
      className: object.className,
      originX: object.originX,
      originY: object.originY,
      fontFamily: object.fontFamily,
      scaleX: object.scaleX,
      scaleY: object.scaleY,
      type: object.type,
      id: object.id,
      index: object.index + 1,
      selectable: false
    });
    fabricRef.current.add(text);
    fabricRef.current.renderAll();
  }

  return {handleCreateImage, handleCreateText, handleCreateUniversalText}
  
}

export default useAddMultiplyLayer

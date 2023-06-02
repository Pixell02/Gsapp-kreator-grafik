import React from 'react'
import { fabric } from 'fabric';

export const initFabric = (background, fabricRef ) => {
  if (background) {
    
    const img = new Image();
    
    img.src = background;
    img.onload = () => {
      fabricRef.current = new fabric.Canvas("canvas", {
        selection: true,
        width: img.width,
        height: img.height,
      });
      fabric.Image.fromURL(img.src, function (img) {
        img.scaleToHeight(img.height);
        fabricRef.current.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current));
      });
      console.log(fabricRef.current)
    };
    
  return {fabricRef}
  }
  
}

import React from 'react'
import { fabric } from 'fabric';

export const initFabric = (background, fabricRef ) => {
  if (background) {
    const img = new Image();
    
    img.src = background;
   
    fabricRef.current = new fabric.Canvas("canvas", {
      selection: true,
      width: img.width,
      height: img.height,
    });
    const newImage = new Image();
    newImage.src = background;
    newImage.width = img.width;
    newImage.height = img.height;
    document.querySelector(".canvas-container").style.display = "flex";
    document.querySelector(".canvas-container").style.marginTop = "50px";
    document.querySelector(".upper-canvas").style.position = "inherit";
    img.onload = () => {
      const newImg = new fabric.Image.fromURL(img.src, function (img) {
        img.scaleToHeight(newImage.height);
        fabricRef.current.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current));
      });
    
    };
    
  return {fabricRef}
  }
  
}

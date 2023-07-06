import React from 'react'
import { fabric } from 'fabric';
import createDefaultObjects from './createDefaultObjects';

export const initFabric = (fabricRef, background) => {
  const img = new Image();
    img.src = background;
    img.onload = () => {
  fabricRef.current = new fabric.Canvas("canvas", {
         selection: true
       });
    };

    fabricRef.current.setWidth(img.width);
    fabricRef.current.setHeight(img.height);
  
    
      fabric.Image.fromURL(img.src, function (img) {
        img.scaleToHeight(img.height);
        fabricRef.current.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current));

      });


}

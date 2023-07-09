import React from 'react'
import { fabric } from "fabric";

const playerImage = (fabricRef, playerImage, coords) => {

  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "playerImage") {
      fabricRef.current.remove(fabricRef.current.item(i));
      fabricRef.current.renderAll();
    }
  });
  const img = new Image();
  img.src = playerImage;

  img.onload = () => {
    fabric.Image.fromURL(img.src, function (img) {
      img.set({
        selectable: false,
        top: coords.playerImage.Top,
        left: coords.playerImage.Left,
        originX: "center",
        originY: "top",
        angle: (coords.playerImage.Angle || 0),
        className: "playerImage",
      });
    
          img.scaleToWidth(coords.playerImage.ScaleToWidth);
        
      fabricRef.current.add(img);
      fabricRef.current.renderAll();
    });
  };

  
}

export default playerImage

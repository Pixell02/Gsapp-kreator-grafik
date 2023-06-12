import React from "react";
import { fabric } from "fabric";
import createDefaultObjects from "./createDefaultObjects";

const useFabric = () => {
  const initFabric = (fabricRef, img) => {
    fabricRef.current = new fabric.Canvas("canvas", {
      selection: true,
      width: img.width,
      height: img.height,
    });
    
    const newImg = new fabric.Image.fromURL(img.src, function (img) {
      fabricRef.current.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current));
    });
      
    // createDefaultObjects(fabricRef, globalProperties, coords);
    return { fabricRef }
  };
  
  return { initFabric };
};

export default useFabric;

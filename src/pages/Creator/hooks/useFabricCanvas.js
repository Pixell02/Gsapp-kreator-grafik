
import { fabric } from "fabric";
import useImageRefProvider from "./useImageRefProvider";
import { useRef, useState } from "react";

const useFabricCanvas = () => {

  // const imageRef = useRef(null)
  

  const initFabric = (fabricRef, image) => {
    if (!fabricRef.current?._objects) {
      fabricRef.current = new fabric.Canvas("canvas", {
        selection: true,
        width: image.width,
        height: image.height,
      });
    }
    const backgroundImage = fabricRef.current.getObjects().find((item) => item.className === "background0")
    
    if (backgroundImage) {
      backgroundImage.setSrc(image.src, () => {
        fabricRef.current.renderAll();
      });
    } else {
        fabric.Image.fromURL(image.src, function (img) {
        img.set({
          selectable: false,
          width: image.width,
          height: image.height,
          className: "background0"
        })
        
          fabricRef.current.add(img);
        fabricRef.current.renderAll();
      });
    }
    
  };
  
  return { initFabric };
}

export default useFabricCanvas;
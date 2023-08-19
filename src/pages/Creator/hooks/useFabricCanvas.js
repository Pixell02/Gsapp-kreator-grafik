import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import useImageRefProvider from "./useImageRefProvider";

const useFabricCanvas = () => {
  
  const { imageRef } = useImageRefProvider();

  const initFabric = (fabricRef, image) => {
    if (!fabricRef.current?._objects) {
      fabricRef.current = new fabric.Canvas("canvas", {
        selection: false,
        width: image.width,
        height: image.height,
      });
    }
    if (imageRef.current) {
      imageRef.current.setSrc(image.src, () => {
        fabricRef.current.renderAll();
      });
      
    } else {
        fabric.Image.fromURL(image.src, function (img) {
        img.set({
          selectable: false,
          zIndex: 0,
        })
        fabricRef.current.add(img);
        fabricRef.current.renderAll();
        imageRef.current = img;
        // fabricRef.current.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current));
      });
    }
    
  };
  
  return { initFabric };
}

export default useFabricCanvas;
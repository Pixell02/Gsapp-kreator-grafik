import React, { useContext } from "react";
import { fabric } from "fabric";
import { BackgroundContext } from "../../Context/BackgroundContext";
import useImageRefProvider from "../../../Creator/hooks/useImageRefProvider";


const useFabric = () => {
  const { setColor } = useContext(BackgroundContext);

  const { imageRef } = useImageRefProvider();

  const initFabric = (fabricRef, img) => {
      fabricRef.current = new fabric.Canvas("canvas", {
        selection: true,
        width: img.width,
        height: img.height,
      });
      fabric.Image.fromURL(img.src, function (img) {
      img.set({
        selectable: false,
      })
      fabricRef.current.add(img);
        fabricRef.current.renderAll();
        imageRef.current = img;
        // fabricRef.current.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current));
      });
    
    setColor(img.color);
    return { fabricRef }
  };
  
  return { initFabric };
};

export default useFabric;

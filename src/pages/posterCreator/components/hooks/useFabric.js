import React, { useContext } from "react";
import { fabric } from "fabric";
import { BackgroundContext } from "../../Context/BackgroundContext";


const useFabric = () => {
  const { setColor } = useContext(BackgroundContext);


  const initFabric = (fabricRef, img) => {
      console.log(img)
      fabricRef.current = new fabric.Canvas("canvas", {
        selection: true,
        width: img.width,
        height: img.height,
      });
      fabric.Image.fromURL(img.src, function (img) {
        fabricRef.current.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current));
      });
    setColor(img.color);
    return { fabricRef }
  };
  
  return { initFabric };
};

export default useFabric;

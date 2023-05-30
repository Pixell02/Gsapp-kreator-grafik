import { useEffect, useRef } from "react";
import { fabric } from "fabric";

export default function useFabricCanvas(fabricRef, props) {
  const backImg = new Image();
  
  backImg.src = props.posterBackGround;

  const initFabric = () => {
    
    fabricRef.current = new fabric.Canvas("canvas", {
      selection: false,
      width: backImg.width,
      height: backImg.height,
    });
    
    const img = new Image();

    img.src = props.posterBackGround;
    
    img.onload = () => {
      const newImg = new fabric.Image.fromURL(img.src, function (img) {
        fabricRef.current.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current));
      });

      document.querySelector(".lower-canvas").style.width = img.width + "px";
      document.querySelector(".lower-canvas").style.height = img.height + "px";
      document.querySelector(".lower-canvas").width = img.width;
      document.querySelector(".lower-canvas").height = img.height;
      document.querySelector(".upper-canvas").width = img.width;
      document.querySelector(".upper-canvas").height = img.height;
      document.querySelector(".upper-canvas").style.width = img.width + "px";
      document.querySelector(".upper-canvas").style.height = img.height + "px";
      document.querySelector(".canvas-container").style.width = img.width + "px";
      document.querySelector(".canvas-container").style.height = img.height + "px";
    };
  };
  
  return { initFabric };
}

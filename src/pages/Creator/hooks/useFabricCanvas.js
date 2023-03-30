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
  const initFabricScale = () => {
    fabricRef.current = new fabric.Canvas("canvas", {
      selection: false,
      width: backImg.width / 2,
      height: backImg.height / 2,
    });
    const image = new Image();

    image.src = props.posterBackGround;
    image.width = image.width / 2;
    image.height = image.height / 2;

    image.onload = () => {
      const newImg = new fabric.Image.fromURL(image.src, function (img) {
        img.scaleToHeight(image.height);
        fabricRef.current.setBackgroundImage(img, fabricRef.current.renderAll.bind(fabricRef.current));
      });

      document.querySelector(".lower-canvas").style.width = image.width + "px";
      document.querySelector(".lower-canvas").style.height = image.height + "px";
      document.querySelector(".lower-canvas").width = image.width;
      document.querySelector(".lower-canvas").height = image.height;
      document.querySelector(".upper-canvas").width = image.width;
      document.querySelector(".upper-canvas").height = image.height;
      document.querySelector(".upper-canvas").style.width = image.width + "px";
      document.querySelector(".upper-canvas").style.height = image.height + "px";
      document.querySelector(".canvas-container").style.width = image.width + "px";
      document.querySelector(".canvas-container").style.height = image.height + "px";
    };
  };

  return { initFabric, initFabricScale };
}

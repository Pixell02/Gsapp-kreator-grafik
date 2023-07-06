import React, { useContext, useEffect, useRef, useState } from "react";
import { BackgroundContext } from "../Context/BackgroundContext";
import { initFabric } from "./hooks/initFabric";
import { fabric } from "fabric";
import createDefaultObjects from "./hooks/createDefaultObjects";
import useFabric from "./hooks/useFabric";

export default function Canvas(props) {

  const { background, setColor, image, setImage } = useContext(BackgroundContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const { initFabric } = useFabric();
  console.log(image)
  useEffect(() => {
    const img = new Image();
    img.src = background.src;
    img.onload = () => {
      setImage(img);
    };
  }, [background]);


  useEffect(() => {
    if (props.fabricRef.current && image && !isLoaded) {
      fabric.Image.fromURL(image.src ? image.src : null, function (img) {
        props.fabricRef.current.setBackgroundImage(
          img, props.fabricRef.current.renderAll.bind(props.fabricRef.current)
        );
      });
      setColor(background.color)
      setIsLoaded(true)
    }
  }, [image]);
  useEffect(() => {
    if (image) initFabric(props.fabricRef, image);
  }, [image]);

  return <canvas id="canvas" ref={props.fabricRef} width={image?.width} height={image?.height}></canvas>;
}

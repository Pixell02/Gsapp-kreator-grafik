import React, { useContext } from "react";
import { BackgroundContext } from "../Context/BackgroundContext";
import { useEffect } from "react";
import useFabric from "./hooks/useFabric";

export default function Canvas(props) {

  const { image } = useContext(BackgroundContext);
  const { initFabric } = useFabric();
  useEffect(() => {
    if (props.defaultBackGround) {
      const img = new Image();
      img.src = props.defaultBackGround.src;
      img.color = props.defaultBackGround.color;
      img.onload = () => {
        const image = {
          color: props.defaultBackGround.color,
          width: img.width,
          height: img.height,
          src: img.src
        }
        initFabric(props.fabricRef, image)
      }
    } 
  },[props.defaultBackGround])


  return <canvas id="canvas" ref={props.fabricRef} width={image?.width} height={image?.height}></canvas>;
}

import React, { useContext, useEffect, useRef, useState } from "react";
import { BackgroundContext } from "../Context/BackgroundContext";
import { initFabric } from "./hooks/initFabric";
import { fabric } from "fabric";
import createDefaultObjects from "./hooks/createDefaultObjects";
import useFabric from "./hooks/useFabric";

export default function Canvas(props) {
  const { background } = useContext(BackgroundContext);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [image, setImage] = useState();
  // console.log(props.fabricRef.current)

  const {initFabric} = useFabric();

  useEffect(() => {
    const img = new Image();
    img.src = background;
    img.onload = () => {
      setImage(img);
    };
  }, [background]);
  useEffect(() => {
    console.log(props.fabricRef.current)
   },[props.fabricRef.current]);
  
  // useEffect(() => {
  //   if (props.fabricRef.current.height && image) {
  //     fabric.Image.fromURL(image.src, function (img) {
  //       props.fabricRef.current.setBackgroundImage(
  //         img,
  //         props.fabricRef.current.renderAll.bind(props.fabricRef.current)
  //       );
  //     });
  //   }
  // }, [props.fabricRef,image]);
  useEffect(() => {
    if (image) initFabric(props.fabricRef, image);
  }, [image]);
 
  return <canvas id="canvas" ref={props.fabricRef} width={image?.width} height={image?.height}></canvas>;
}

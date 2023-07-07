import React, { useContext, useEffect,useState } from "react";
import { BackgroundContext } from "../Context/BackgroundContext";
import useFabric from "./hooks/useFabric";

export default function Canvas(props) {

  const {image} = useContext(BackgroundContext);
  
  const [preview, setPreview] = useState();
  // const { initFabric } = useFabric();
  // useEffect(() => {
  //   const img = new Image();
  //   img.src = image.src;
  //   img.onload = () => {
  //     setPreview({
  //       src: img.src,
  //       width: img.width,
  //       height: img.height
  //     });
  //   };
  // }, [image]);
  // useEffect(() => {
    
  //   if (preview && preview.src) {
  //     initFabric(props.fabricRef, preview)
  //   };
  // }, [preview]);

  return <canvas id="canvas" ref={props.fabricRef} width={image?.width} height={image?.height}></canvas>;
}

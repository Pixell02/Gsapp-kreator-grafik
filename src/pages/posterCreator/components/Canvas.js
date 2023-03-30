import React, { useContext, useEffect, useRef, useState } from "react";

import { BackgroundContext } from "../Context/BackgroundContext";
import { GlobalPropertiesContext } from "../Context/GlobalProperitesContext";
import { initFabric } from "./hooks/initFabric";

export default function Canvas({ fabricRef }) {
  const { background } = useContext(BackgroundContext);
  const {globalProperties, setGlobalProperties } = useContext(GlobalPropertiesContext);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const img = new Image();
 

 
  img.src = background;
  useEffect(() => {
    setWidth(img.width);
    setHeight(img.height);
  }, [img]);

  useEffect(() => {
    initFabric(background, fabricRef);
  }, [background]);

  return (
    
      <canvas id="canvas"
        ref={fabricRef}
        width={width} height={height}></canvas>
    
  );
}

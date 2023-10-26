import React, { useEffect } from "react";
import useCanvasPropertiesContext from "./hooks/useCanvasPropertiesContext";
import useFabricCanvas from "./hooks/useFabricCanvas";

function Canvas(props) {
  const { width, setWidth, height, setHeight } = useCanvasPropertiesContext();
  const { initFabric } = useFabricCanvas();

  useEffect(() => {
    const img = new Image();
    img.src = props.posterBackGround;

    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
      const image = {
        src: img.src,
        width: img.width,
        height: img.height,
      };
      initFabric(props.fabricRef, image);
    };
  }, [props.posterBackGround, props.fabricRef, initFabric, setWidth, setHeight]);

  return <canvas id="canvas" className="resposive-canvas" ref={props.fabricRef} width={width} height={height} />;
}

export default Canvas;

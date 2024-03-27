import React, { RefObject } from "react";
import { useBackgroundContext } from "../Context/BackgroundContext";
import { useEffect } from "react";
import useFabric from "./hooks/useFabric";
import createDefaultObjects from "./hooks/createDefaultObjects";
import { MultiProperties, useGlobalPropertiesContext } from "../Context/GlobalProperitesContext";
import { FabricRef } from "../../../types/creatorComponentsTypes";
export default function Canvas({ fabricRef }: { fabricRef: FabricRef }) {
  const { image: defaultImage } = useBackgroundContext();
  const { globalProperties, setIsMany, setProperties } = useGlobalPropertiesContext();
  const { initFabric } = useFabric();
  useEffect(() => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current as fabric.Canvas;
    const objects = canvas.getObjects();
    if (objects) {
      if (globalProperties?.orientation) {
        setProperties(
          (prev) =>
            ({
              ...prev,
              orientation: globalProperties.orientation,
              Margin: globalProperties.Margin,
              numberOfMatches: globalProperties.numberOfMatches,
            } as MultiProperties)
        );
      }
      createDefaultObjects(fabricRef, globalProperties, setIsMany);
    }
  }, [fabricRef]);

  useEffect(() => {
    if (defaultImage) {
      const img = new Image();
      img.src = defaultImage.src;
      img.onload = () => {
        const image = {
          color: defaultImage.color,
          width: img.width,
          height: img.height,
          src: img.src,
        };
        initFabric(fabricRef, image);
      };
    }
  }, [defaultImage, fabricRef]);

  return <>{defaultImage && <canvas id="canvas" ref={fabricRef.current as RefObject<HTMLCanvasElement>}></canvas>}</>;
}

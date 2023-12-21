import React from "react";
import { useBackgroundContext } from "../Context/BackgroundContext";
import { useEffect } from "react";
import useFabric from "./hooks/useFabric";
import useGlobalPropertiesContext from "./hooks/useGlobalPropertiesContext";
import { useMultiPropertiesContext } from "./hooks/useMultiPropertiesContext";
import createDefaultObjects from "../../posterCreator/components/hooks/createDefaultObjects";
export default function Canvas({ fabricRef }) {
  const { image: defaultImage } = useBackgroundContext();
  const { globalProperties } = useGlobalPropertiesContext();
  const { initFabric } = useFabric();
  const { setIsMany, setProperties } = useMultiPropertiesContext();
  useEffect(() => {
    if (fabricRef.current?._objects) {
      if (globalProperties?.orientation) {
        setProperties((prev) => ({
          ...prev,
          orientation: globalProperties.orientation,
          Margin: globalProperties.Margin,
          numberOfMatches: globalProperties.numberOfMatches,
        }));
      }
      createDefaultObjects(fabricRef, globalProperties, setIsMany);
    }
  }, [fabricRef.current?._objects]);

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

  return (
    <>
      {defaultImage && (
        <canvas id="canvas" ref={fabricRef} width={defaultImage?.width} height={defaultImage?.height}></canvas>
      )}
    </>
  );
}

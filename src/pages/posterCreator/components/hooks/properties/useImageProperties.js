import { useEffect } from "react";
import useCoords from "../useCoords";
import useGlobalPropertiesContext from "../useGlobalPropertiesContext";
import useUniqueKey from "../useUniqueKey";

const useImageProperties = (fabricRef) => {
  const propertyKeys = [
    "Top",
    "Left",
    "className",
    "Angle",
    "Width",
    "Height",
    "ScaleToWidth",
    "ScaleToHeight",
    "type",
    "filters"
  ];
  const { coords, handleInputChange } = useCoords(fabricRef, propertyKeys);
  const { setGlobalProperties } = useGlobalPropertiesContext();
  const { getUniqueTextArray } = useUniqueKey(fabricRef);
  useEffect(() => {
    if (Object.keys(coords).length === 0) return;
    if (coords?.type !== "FilteredImage") return;
    setGlobalProperties((prevState) => {
      const updatedCoords = getUniqueTextArray([...(prevState.Image || []), coords]);
      console.log(coords.filters[0]?.brightness)
      return {
        ...prevState,
        Images: updatedCoords,
      };
    });
  }, [coords]);

  return { coords, handleInputChange };
};

export default useImageProperties;

import { useEffect } from "react";
import useCoords from "../useCoords";
import useGlobalPropertiesContext from "../useGlobalPropertiesContext";
import useMultipleObjectProperties from "./useMultipleObjectProperties";

const useSingleCrestProperties = (fabricRef) => {
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
  ];

  const { coords, handleInputChange, handleSelectChange, updateActiveObjectCoords } = useCoords(
    fabricRef,
    propertyKeys
  );
  const { setGlobalProperties } = useGlobalPropertiesContext();
  const { handlePropertiesChange } = useMultipleObjectProperties(fabricRef);

  useEffect(() => {
    if (!coords) return;
    if (Object.keys(coords).length === 0) return;
    if (coords.type === "image" || coords.type === "multiplyimage") {
      if (coords.type === "multiplyimage") {
        handlePropertiesChange();
      }
      setGlobalProperties((prevState) => {
        const updatedCoords = {
          [coords.className]: coords,
        };
        return {
          ...prevState,
          ...updatedCoords,
        };
      });
    }
  }, [coords]);

  return { coords, handleInputChange, handleSelectChange, updateActiveObjectCoords };
};

export default useSingleCrestProperties;

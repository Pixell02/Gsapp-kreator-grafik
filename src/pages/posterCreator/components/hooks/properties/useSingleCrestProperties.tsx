import { useEffect } from "react";
import useCoords from "../useCoords";
import { GlobalProperties, useGlobalPropertiesContext } from "../../../Context/GlobalProperitesContext";
import useMultipleObjectProperties from "./useMultipleObjectProperties";
import { FabricReference } from "../../../../../types/creatorComponentsTypes";

const useSingleCrestProperties = (fabricRef: FabricReference) => {
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
    if (coords?.type === "image" || coords?.type === "multiplyimage") {
      if (coords.type === "multiplyimage") {
        handlePropertiesChange();
      }
      const { className } = coords;
      setGlobalProperties((prevState) => {
        const updatedCoords = {
          [className as string]: coords,
        };
        return {
          ...prevState,
          ...updatedCoords,
        } as GlobalProperties;
      });
    }
  }, [coords]);

  return { coords, handleInputChange, handleSelectChange, updateActiveObjectCoords };
};

export default useSingleCrestProperties;

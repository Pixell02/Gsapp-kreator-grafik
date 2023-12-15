import { useEffect } from "react";
import useCoords from "../useCoords";
import useGlobalPropertiesContext from "../useGlobalPropertiesContext";
import useUniqueKey from "../useUniqueKey";

const usePlayerImageProperties = (fabricRef) => {
  const propertyKeys = ["Top", "Left", "Width", "Height", "ScaleToWidth", "ScaleToHeight", "type", "className", "Angle"];
  const { coords, handleInputChange } = useCoords(fabricRef, propertyKeys);
  const { setGlobalProperties } = useGlobalPropertiesContext();
  const { getUniqueTextArray } = useUniqueKey(fabricRef);

  useEffect(() => {
    if (coords?.type !== "playerImage") return;

    setGlobalProperties((prevState) => {
      const updatedCoords = {
        [coords.type]: getUniqueTextArray([...(prevState[coords.type] || []), coords]),
      };

      return {
        ...prevState,
        ...updatedCoords,
      };
    });
  }, [coords]);

  return { coords, handleInputChange };
};

export default usePlayerImageProperties;

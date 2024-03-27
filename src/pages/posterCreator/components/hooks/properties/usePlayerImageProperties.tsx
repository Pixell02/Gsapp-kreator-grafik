import { useEffect } from "react";
import useCoords from "../useCoords";
import useUniqueKey from "../useUniqueKey";
import { useGlobalPropertiesContext } from "../../../Context/GlobalProperitesContext";
import { FabricReference } from "../../../../../types/creatorComponentsTypes";

const usePlayerImageProperties = (fabricRef: FabricReference) => {
  const propertyKeys = [
    "Top",
    "Left",
    "Width",
    "Height",
    "ScaleToWidth",
    "ScaleToHeight",
    "type",
    "className",
    "Angle",
  ];
  const { coords, handleInputChange } = useCoords(fabricRef, propertyKeys);
  const { setGlobalProperties } = useGlobalPropertiesContext();
  const { getUniqueTextArray } = useUniqueKey(fabricRef);

  useEffect(() => {
    if (coords?.type !== "playerImage") return;
    const { type } = coords;
    setGlobalProperties((prevState) => {
      const updatedCoords = {
        [type]: getUniqueTextArray([...(prevState[type] || []), coords]),
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

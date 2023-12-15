import { useEffect } from "react";
import useCoords from "../useCoords";
import useGlobalPropertiesContext from "../useGlobalPropertiesContext";
import useUniqueKey from "../useUniqueKey";
import useFiltersArray from "../useFiltersArray";
import useThemeOption from "../useThemeOption";
import useImageThemeColor from "../useImageThemeColor";

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
  const { coords, handleInputChange } = useCoords(fabricRef, propertyKeys, "FilteredImage");
  const { setGlobalProperties } = useGlobalPropertiesContext();
  const { setImageThemeOption } = useThemeOption()
  const { getUniqueTextArray } = useUniqueKey(fabricRef);
  const fill = useImageThemeColor(fabricRef);
  useEffect(() => {
    if (Object.keys(coords).length === 0) return;
    if (coords?.type !== "FilteredImage") return;
    setGlobalProperties((prevState) => {
      const updatedCoordsWithThemeOption = setImageThemeOption(prevState.Images || [], coords)
      const updatedCoords = getUniqueTextArray([...(prevState.Images || []), updatedCoordsWithThemeOption]);
      
      return {
        ...prevState,
        Images: updatedCoords,
      };
    });
  }, [coords]);


  return { coords, handleInputChange };
};

export default useImageProperties;

import { useEffect } from "react";
import useCoords from "../useCoords";
import useGlobalPropertiesContext from "../useGlobalPropertiesContext";
import useTextFillChange from "../useTextFillChange";
import useThemeOption from "../useThemeOption";
import useUniqueKey from "../useUniqueKey";

const usePlayerNameProperties = (fabricRef) => {
  const propertyKeys = [
    "Top",
    "Left",
    "className",
    "Angle",
    "FontFamily",
    "CharSpacing",
    "TextAlign",
    "FontStyle",
    "Width",
    "Height",
    "ScaleToWidth",
    "ScaleToHeight",
    "FontSize",
    "OriginX",
    "OriginY",
    "type",
    "Fill",
    "Format",
  ];
  const { coords, handleInputChange, handleSelectChange } = useCoords(fabricRef, propertyKeys);
  const { setGlobalProperties } = useGlobalPropertiesContext();
  const { setUniversalThemeOption } = useThemeOption();
  const { getUniqueTextArray } = useUniqueKey(fabricRef);
  const fill = useTextFillChange(fabricRef);
  useEffect(() => {
    if (Object.keys(coords).length === 0) return;
    if (coords?.type !== "playerGoal") return;
    setGlobalProperties((prevState) => {
      
      const updatedCoordsWithThemeOption = setUniversalThemeOption(prevState.player || [], coords);
      const updatedCoords = getUniqueTextArray([...(prevState.player || []), updatedCoordsWithThemeOption]);

      return {
        ...prevState,
        player: updatedCoords,
      };
    });
  }, [coords]);

  return { coords, fill, handleInputChange, handleSelectChange };
};

export default usePlayerNameProperties;

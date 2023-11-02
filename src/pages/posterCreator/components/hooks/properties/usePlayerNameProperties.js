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
    "OriginX",
    "OriginY",
    "type",
    "Fill",
    "Format",
  ];
  const { coords, handleInputChange, handleSelectChange } = useCoords(fabricRef, propertyKeys);
  const { setGlobalProperties } = useGlobalPropertiesContext();
  const setThemeOption = useThemeOption();
  const { getUniqueTextArray } = useUniqueKey(fabricRef);
  const fill = useTextFillChange(fabricRef, coords);
  useEffect(() => {
    if (Object.keys(coords).length === 0) return;
    if (coords?.type !== "playerGoal") return;
    setGlobalProperties((prevState) => {
      const updatedCoordsWithThemeOption = setThemeOption(coords);
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

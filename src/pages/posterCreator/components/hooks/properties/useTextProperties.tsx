import { useEffect } from "react";
import useCoords from "../useCoords";
import useTextFillChange from "../useTextFillChange";
import useThemeOption from "../useThemeOption";
import useUniqueKey from "../useUniqueKey";
import { useGlobalPropertiesContext } from "../../../Context/GlobalProperitesContext";
import useMultipleObjectProperties from "./useMultipleObjectProperties";
import { FabricReference } from "../../../../../types/creatorComponentsTypes";

const useTextProperties = (fabricRef: FabricReference) => {
  const propertyKeys = [
    "Top",
    "Left",
    "className",
    "Angle",
    "FontFamily",
    "CharSpacing",
    "TextAlign",
    "FontStyle",
    "FontSize",
    "Width",
    "Height",
    "ScaleToWidth",
    "ScaleToHeight",
    "OriginX",
    "OriginY",
    "type",
    "Fill",
  ];
  const { coords, handleInputChange, handleSelectChange } = useCoords(fabricRef, propertyKeys);
  const fill = useTextFillChange(fabricRef);
  const { setGlobalProperties } = useGlobalPropertiesContext();
  const { getUniqueTextArray } = useUniqueKey(fabricRef);
  const { handlePropertiesChange } = useMultipleObjectProperties(fabricRef);
  const { setThemeOption, setUniversalThemeOption } = useThemeOption();

  useEffect(() => {
    if (!coords) return;
    if (
      coords?.type === "text" ||
      coords?.type === "multiplyText" ||
      coords?.type === "multiplyUniversalText" ||
      coords?.type === "universalText"
    ) {
      if (coords.type === "multiplyText" || coords.type === "multiplyUniversalText") {
        handlePropertiesChange();
      }
      setGlobalProperties((prevState) => {
        let updatedCoords = {};
        if (coords.type === "text" || coords.type === "multiplyText") {
          const updatedCoordsWithThemeOption = setThemeOption(prevState, coords);
          const { className } = coords;
          updatedCoords = {
            [className as string]: updatedCoordsWithThemeOption,
          };
        } else if (coords.type === "universalText") {
          const updatedCoordsWithThemeOption = setUniversalThemeOption(prevState.Text || [], coords);
          updatedCoords = {
            Text: getUniqueTextArray([...(prevState.Text || []), updatedCoordsWithThemeOption]),
          };
        } else {
          const updatedCoordsWithThemeOption = setUniversalThemeOption(prevState.TextOne || [], coords);
          updatedCoords = {
            TextOne: getUniqueTextArray([...(prevState.TextOne || []), updatedCoordsWithThemeOption]),
          };
        }
        return {
          ...prevState,
          ...updatedCoords,
        };
      });
    }
  }, [coords]);

  return { coords, handleInputChange, handleSelectChange, fill };
};

export default useTextProperties;

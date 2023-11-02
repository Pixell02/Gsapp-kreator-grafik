import { useEffect } from "react";
import useCoords from "../useCoords";
import useGlobalPropertiesContext from "../useGlobalPropertiesContext";
import useTextFillChange from "../useTextFillChange";
import useThemeOption from "../useThemeOption";
import useUniqueKey from "../useUniqueKey";
import useMultipleObjectProperties from "./useMultipleObjectProperties";

const useTextProperties = (fabricRef) => {
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
  ];
  const { coords, handleInputChange, handleSelectChange } = useCoords(fabricRef, propertyKeys);
  const fill = useTextFillChange(fabricRef, coords);
  const { setGlobalProperties } = useGlobalPropertiesContext();
  const { getUniqueTextArray } = useUniqueKey(fabricRef);
  const { handlePropertiesChange } = useMultipleObjectProperties(fabricRef);
  const setThemeOption = useThemeOption();

  useEffect(() => {
    if (Object.keys(coords).length === 0) return;
    if (coords.type === "text" || coords.type === "multiplyText" || coords.type === "multiplyUniversalText" || coords.type === "universalText") {
      if (coords.type === "multiplyText" || coords.type === "multiplyUniversalText") {
        handlePropertiesChange();
      }
      const updatedCoordsWithThemeOption = setThemeOption(coords);

      setGlobalProperties((prevState) => {
        let updatedCoords = {};
        if (coords.type === "text" || coords.type === "multiplyText") {
          updatedCoords = {
            [coords.className]: updatedCoordsWithThemeOption,
          };
        } else if (coords.type === "universalText") {
          updatedCoords = {
            Text: getUniqueTextArray([...(prevState.Text || []), updatedCoordsWithThemeOption]),
          };
        } else {
          updatedCoords = {
            TextOne: getUniqueTextArray([...(prevState.TextOne || []), updatedCoordsWithThemeOption])
          }
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

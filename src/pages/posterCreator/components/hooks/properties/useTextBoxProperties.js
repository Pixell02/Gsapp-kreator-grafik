import { useEffect } from "react";
import useCoords from "../useCoords";
import useGlobalPropertiesContext from "../useGlobalPropertiesContext";
import useTextFillChange from "../useTextFillChange";
import useThemeOption from "../useThemeOption";
import useUniqueKey from "../useUniqueKey";

const useTextBoxProperties = (fabricRef) => {
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
    "LineHeight",
  ];
  const { coords, handleInputChange, handleSelectChange } = useCoords(fabricRef, propertyKeys);
  const { setGlobalProperties } = useGlobalPropertiesContext();
  const { getUniqueTextArray } = useUniqueKey(fabricRef);
  const setThemeOption = useThemeOption();
  const fill = useTextFillChange(fabricRef, coords);
  useEffect(() => {
    if (Object.keys(coords).length === 0) return;
    if (coords?.type === "universalTextBox" || coords?.type === "textBox")
      setGlobalProperties((prevState) => {
        let updatedCoords = {};
        const updatedCoordsWithThemeOption = setThemeOption(coords);
        if (coords?.type === "universalTextBox") {
          updatedCoords = {
            TextBox: getUniqueTextArray([...(prevState.TextBox || []), updatedCoordsWithThemeOption]),
          };
        } else if (coords?.type === "textBox") {
          updatedCoords = {
            [coords.className]: updatedCoordsWithThemeOption,
          };
        } else {
          return;
        }

        return {
          ...prevState,
          ...updatedCoords,
        };
      });
  }, [coords]);
  return { coords, fill, handleInputChange, handleSelectChange };
};

export default useTextBoxProperties;

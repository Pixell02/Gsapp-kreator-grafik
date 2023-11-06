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
    "FontSize",
    "OriginY",
    "type",
    "Fill",
    "Format",
    "Formatter",
    "LineHeight",
  ];
  const { coords, handleInputChange, handleSelectChange } = useCoords(fabricRef, propertyKeys);
  const { setGlobalProperties } = useGlobalPropertiesContext();
  const { getUniqueTextArray } = useUniqueKey(fabricRef);
  const { setThemeOption, setUniversalThemeOption } = useThemeOption();
  const fill = useTextFillChange(fabricRef);
  useEffect(() => {
    if (Object.keys(coords).length === 0) return;
    if (coords?.type === "universalTextBox" || coords?.type === "textBox")
      setGlobalProperties((prevState) => {
        let updatedCoords = {};
        
        if (coords?.type === "universalTextBox") {
          const updatedCoordsWithThemeOption = setUniversalThemeOption(prevState, coords);
          updatedCoords = {
            TextBox: getUniqueTextArray([...(prevState.TextBox || []), updatedCoordsWithThemeOption]),
          };
        } else if (coords?.type === "textBox") {
          const updatedCoordsWithThemeOption = setThemeOption(prevState, coords);
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

import { useEffect } from "react";
import useCoords from "../useCoords";
import useTextFillChange from "../useTextFillChange";
import useThemeOption from "../useThemeOption";
import useUniqueKey from "../useUniqueKey";
import { useGlobalPropertiesContext } from "../../../Context/GlobalProperitesContext";
import { Textbox } from "../../../../../types/globalPropertiesTypes";
import { FabricReference } from "../../../../../types/creatorComponentsTypes";

const useTextBoxProperties = (fabricRef: FabricReference) => {
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
    "text",
  ];
  const { coords, handleInputChange, handleWriteToLanguage, handleSelectChange } = useCoords(fabricRef, propertyKeys);
  const { setGlobalProperties } = useGlobalPropertiesContext();
  const { getUniqueTextArray } = useUniqueKey(fabricRef);
  const { setThemeOption, setUniversalThemeOption } = useThemeOption();
  const fill = useTextFillChange(fabricRef);
  useEffect(() => {
    if (!coords) return;
    if (coords?.type === "universalTextBox" || coords?.type === "textBox" || coords?.type === "additionalTextBox")
      setGlobalProperties((prevState) => {
        let updatedCoords = {};

        if (coords?.type === "universalTextBox") {
          const updatedCoordsWithThemeOption = setUniversalThemeOption(prevState.TextBox || [], coords);
          updatedCoords = {
            TextBox: getUniqueTextArray<Textbox>([
              ...((prevState.TextBox as Textbox[]) || []),
              updatedCoordsWithThemeOption as Textbox,
            ]),
          };
        } else if (coords?.type === "textBox") {
          const updatedCoordsWithThemeOption = setThemeOption(prevState, coords);
          const { className } = coords;
          updatedCoords = {
            [className as string]: updatedCoordsWithThemeOption,
          };
        } else if (coords?.type === "additionalTextBox") {
          const updatedCoordsWithThemeOption = setUniversalThemeOption(prevState.AdditionalText || [], coords);
          updatedCoords = {
            AdditionalText: getUniqueTextArray<Textbox>([
              ...((prevState.AdditionalText as Textbox[]) || []),
              updatedCoordsWithThemeOption as Textbox,
            ]),
          };
        } else {
          return { ...prevState };
        }

        return {
          ...prevState,
          ...updatedCoords,
        };
      });
  }, [coords]);
  return { coords, fill, handleInputChange, handleSelectChange, handleWriteToLanguage };
};

export default useTextBoxProperties;

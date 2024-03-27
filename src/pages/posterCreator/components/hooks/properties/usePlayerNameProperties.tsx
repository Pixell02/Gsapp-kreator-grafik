import { useEffect } from "react";
import useCoords from "../useCoords";
import useTextFillChange from "../useTextFillChange";
import useThemeOption from "../useThemeOption";
import useUniqueKey from "../useUniqueKey";
import { useGlobalPropertiesContext } from "../../../Context/GlobalProperitesContext";
import { FabricReference } from "../../../../../types/creatorComponentsTypes";
import { Text } from "../../../../../types/globalPropertiesTypes";

const usePlayerNameProperties = (fabricRef: FabricReference) => {
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
  const { keysAndFill } = useTextFillChange(fabricRef);
  console.log(keysAndFill);
  useEffect(() => {
    if (!coords) return;
    if (coords?.type === "playerGoal") {
      setGlobalProperties((prevState) => {
        const updatedCoordsWithThemeOption = setUniversalThemeOption(prevState.player || [], coords);
        const updatedCoords = getUniqueTextArray<Text>([
          ...(prevState.player as Text[]),
          updatedCoordsWithThemeOption as Text,
        ]);

        return {
          ...prevState,
          player: updatedCoords,
        };
      });
    } else if (coords?.type === "playerFirstName") {
      setGlobalProperties((prevState) => {
        const updatedCoordsWithThemeOption = setUniversalThemeOption(prevState.player || [], coords);
        const updatedCoords = getUniqueTextArray<Text>([
          ...((prevState?.playerFirstName as Text[]) || []),
          updatedCoordsWithThemeOption as Text,
        ]);

        return {
          ...prevState,
          playerFirstName: updatedCoords,
        };
      });
    } else if (coords?.type === "playerLastName") {
      setGlobalProperties((prevState) => {
        const updatedCoordsWithThemeOption = setUniversalThemeOption(prevState.player || [], coords);
        const updatedCoords = getUniqueTextArray<Text>([
          ...((prevState.playerLastName as Text[]) || []),
          updatedCoordsWithThemeOption as Text,
        ]);

        return {
          ...prevState,
          playerLastName: updatedCoords,
        };
      });
    } else {
      return;
    }
  }, [coords]);

  return { coords, handleInputChange, handleSelectChange };
};

export default usePlayerNameProperties;

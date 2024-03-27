import { useEffect } from "react";
import useCoords from "../useCoords";
import useUniqueKey from "../useUniqueKey";
import useThemeOption from "../useThemeOption";
import useImageThemeColor from "../useImageThemeColor";
import { GlobalProperties, useGlobalPropertiesContext } from "../../../Context/GlobalProperitesContext";
import { FabricReference, ImagesWithFilter } from "../../../../../types/creatorComponentsTypes";

const useImageProperties = (fabricRef: FabricReference) => {
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
    "filters",
  ];
  const { coords, handleInputChange } = useCoords(fabricRef, propertyKeys);
  const { setGlobalProperties } = useGlobalPropertiesContext();
  const { setImageThemeOption } = useThemeOption();
  const { getUniqueTextArray } = useUniqueKey(fabricRef);
  useImageThemeColor(fabricRef);
  useEffect(() => {
    if (!coords) return;
    if (coords?.type !== "FilteredImage") return;
    setGlobalProperties((prevState) => {
      const updatedCoordsWithThemeOption = setImageThemeOption(prevState.Images || [], coords);
      const updatedCoords = getUniqueTextArray<ImagesWithFilter>([
        ...(prevState.Images || []),
        updatedCoordsWithThemeOption as ImagesWithFilter,
      ]);

      return {
        ...prevState,
        Images: updatedCoords,
      } as GlobalProperties;
    });
  }, [coords]);

  return { coords, handleInputChange };
};

export default useImageProperties;

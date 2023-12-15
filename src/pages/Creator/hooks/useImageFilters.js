import { useEffect, useState } from "react";
import { fabric } from "fabric";
import useThemeContext from "./useThemeContext";



const useImageFilters = (objectFilters) => {
  const [activeFilters, setFilters] = useState({});
  const { themeColor } = useThemeContext();
 

  

  useEffect(() => {
     const addDefaultFilter = (filterName, filters) => {
    const color = filters?.themeOption?.find((option) => option.label === themeColor.label)
    switch (filterName) {
      case "brightness":
        return new fabric.Image.filters.Brightness({ ...filters });
      case "contrast":
        return new fabric.Image.filters.Contrast({ ...filters });
      case "saturation":
        return new fabric.Image.filters.Saturation({ ...filters });
      case "blendColor":
        return new fabric.Image.filters.BlendColor({ alpha: filters.alpha, blendMode: filters.blendMode, color: color?.color || filters.color });
      case "grayScale":
        return new fabric.Image.filters.Grayscale({ ...filters });
      default:
        return null;
    }
  };
    if (!objectFilters) return;
    const filterKeys = Object.keys(objectFilters);
    const updatedFilters = filterKeys.map((objFilter) => {
      const filter = addDefaultFilter(objFilter, objectFilters[objFilter]);
      return filter;
    });
    setFilters(updatedFilters);
  }, [objectFilters, themeColor]);
  return { activeFilters };
};

export default useImageFilters;

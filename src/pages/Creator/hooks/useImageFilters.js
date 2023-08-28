import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";

const useImageFilters = (objectFilters) => {

  const [activeFilters, setFilters] = useState({});
  const addDefaultFilter = (filterName, filters) => {
    switch (filterName) {
      case "brightness":
        return new fabric.Image.filters.Brightness({ ...filters });
      case "contrast":
        return new fabric.Image.filters.Contrast({ ...filters });
      case "saturation":
        return new fabric.Image.filters.Saturation({ ...filters });
      case "blendColor":
        return new fabric.Image.filters.BlendColor({ ...filters });
      case "grayScale":
        return new fabric.Image.filters.Grayscale({ ...filters });
      default:
        return null;
    }
  };


  useEffect(() => {
    if (!objectFilters) return;
    const filterKeys = Object.keys(objectFilters);
    const updatedFilters = filterKeys.map(objFilter => {
      const filter = addDefaultFilter(objFilter, objectFilters[objFilter]);
      return filter;
    });
    setFilters(updatedFilters);
  }, [objectFilters]);



  return {activeFilters}
}

export default useImageFilters;

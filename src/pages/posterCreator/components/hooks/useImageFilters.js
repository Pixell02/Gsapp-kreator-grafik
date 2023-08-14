import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import useActiveObjectFilters from "./useActiveObjectFilters";
import { useContext } from "react";
import { GlobalPropertiesContext } from "../../Context/GlobalProperitesContext";

const useImageFilters = (fabricRef) => {

  const { globalProperties, setGlobalProperties } = useContext(GlobalPropertiesContext);
  const [imageProperties, setImageProperties] = useState(null)
  const [elements] = useState([
    { className: "brightness", name: "jasność" },
    { className: "contrast", name: "kontraskt" },
    { className: "saturation", name: "nasycenie" },
  ]);
  const { objectFilters } = useActiveObjectFilters(fabricRef);

  const [filters, setFilters] = useState({
    brightness: { value: 50, active: false },
    contrast: { value: 50, active: false },
    saturation: { value: 50, active: false },
    blendColor: {
      value: "#000000",
      active: false,
      blendMode: "multiply",
      alpha: 0,
    },
  });

  useEffect(() => {
    const coords = {

      filters: filters
    }

  },[filters])

  useEffect(() => {
    if (!objectFilters?.length) return;
    const updatedFilters = { ...filters };
    objectFilters.forEach((objFilter) => {
      const filterKeys = Object.keys(objFilter);
      for (const key of filterKeys) {
        if (updatedFilters[key]) {
          updatedFilters[key] = {
            ...updatedFilters[key],
            active: true,
            value: (objFilter[key] + 0.5) * 100,
          };
        }
      }
    });

    setFilters(updatedFilters);
  }, [objectFilters])

  const handleAlphaChange = (className, alpha) => {
    setFilters((prev) => ({
      ...prev,
      [className]: {
        ...prev[className],
        alpha: Number(alpha)
      }
    }))
  }
  
  const handleModeChange = (mode, className) => {
    setFilters((prev) => ({
      ...prev,
      [className]: {
        ...prev[className],
        blendMode: mode
      }
    }))
  }

  const handleCheckFilter = (className, checked) => {
    setFilters((prev) => ({
      ...prev,
      [className]: {
        ...prev[className],
        active: checked,
      },
    }));
  };

  const handleValuesChange = (className, value) => {
    setFilters((prev) => ({
      ...prev,
      [className]: {
        ...prev[className],
        value: value,
      },
    }));
  };
  useEffect(() => {
    if (!fabricRef?.current) return;

    const canvas = fabricRef.current;
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    const activeFilters = Object.keys(filters).reduce((acc, filterName) => {
      const { value, active, blendMode, alpha } = filters[filterName];
      if (active) {
        const filter = addFilter(filterName, value, blendMode, alpha);

        if (filter) {
          acc.push(filter);
        }
      }
      return acc;
    }, []);
    console.log(activeFilters)
    activeObject.filters = activeFilters;
    activeObject.applyFilters();
    canvas.renderAll();
  }, [filters]);

  return { filters, handleCheckFilter, handleValuesChange, elements, handleModeChange, handleAlphaChange };
};

const addFilter = (filterName, value, blendMode, alpha) => {
  switch (filterName) {
    case "brightness":
      return new fabric.Image.filters.Brightness({ brightness: value / 100 - 0.5 });
    case "contrast":
      return new fabric.Image.filters.Contrast({ contrast: value / 100 - 0.5 });
    case "saturation":
      return new fabric.Image.filters.Saturation({ saturation: value / 100 - 0.5 });
    case "blendColor":
      return new fabric.Image.filters.BlendColor({color: value, mode: blendMode, alpha: alpha / 100});
    default:
      return null;
  }
};

export default useImageFilters;

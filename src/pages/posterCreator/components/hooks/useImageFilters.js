import { fabric } from "fabric";
import useFilters from "./useFilters";
import { useEffect } from "react";
import useBackgroundContext from "./useBackgroundContext";
const useImageFilters = (fabricRef, coords) => {
  

  const { filters, setFilters } = useFilters(fabricRef, coords);
  const { color } = useBackgroundContext()

  const handleAlphaChange = (className, alpha) => {
    setFilters((prev) => ({
      ...prev,
      [className]: {
        ...prev[className],
        alpha: alpha / 100,
      },
    }));
  };

  const handleModeChange = (mode, className) => {
    setFilters((prev) => ({
      ...prev,
      [className]: {
        ...prev[className],
        mode: mode,
      },
    }));
  };

  const handleCheckFilter = (className) => {
    if (!filters[className]) {
      if (className !== "blendColor") {
        setFilters((prev) => ({
          ...prev,
          [className]: {
            [className]: 0,
          },
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          [className]: {
            color: "#000000",
            alpha: 0,
            blendMode: "add",
          },
        }));
      }
    } else {
      const updatedFilters = Object.keys(filters).reduce((acc, key) => {
        if (key !== className) {
          acc[key] = filters[key];
        }
        return acc;
      }, {});
      setFilters(updatedFilters);
    }
  };

  const handleValuesChange = (className, value) => {
    if (className !== "blendColor") {
      setFilters((prev) => ({
        ...prev,
        [className]: {
          ...prev[className],
          [className]: value / 100 - 0.5,
        },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [className]: {
          ...prev[className],
          color: value,
        },
      }));
    }
  };
  
  useEffect(() => {
    if (!fabricRef?.current) return;
    const canvas = fabricRef.current;
    if (!canvas || !filters) return;
    if (coords?.type !== "FilteredImage") return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    const activeFilters = Object.keys(filters).reduce((acc, filterName) => {
      if (filters[filterName]) {
        const filter = addDefaultFilter(filterName, filters[filterName]);

        if (filter) {
          acc.push(filter);
        }
      }

      return acc;
    }, []);
    activeObject.filters = activeFilters;
    activeObject.applyFilters();
    canvas.renderAll();
    
  }, [filters, coords, fabricRef]);


  return { filters, handleCheckFilter, handleValuesChange, handleModeChange, handleAlphaChange };
};

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

export default useImageFilters;

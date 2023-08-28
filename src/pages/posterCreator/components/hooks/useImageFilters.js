import { useEffect, useState } from "react";
import { fabric } from "fabric";
import useActiveObjectFilters from "./useActiveObjectFilters";
import { useContext } from "react";
import { GlobalPropertiesContext } from "../../Context/GlobalProperitesContext";
import useCoords from "./useCoords";
import useImageFiltersContext from "./useImageFiltersContext";

const useImageFilters = (fabricRef) => {
  const { coords } = useCoords(fabricRef);
  const { setGlobalProperties } = useContext(GlobalPropertiesContext);

  const [elements] = useState([
    { className: "brightness", name: "jasność" },
    { className: "contrast", name: "kontraskt" },
    { className: "saturation", name: "nasycenie" },
  ]);

  const { filters, setFilters } = useImageFiltersContext();

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
        blendMode: mode,
      },
    }));
  };

  const handleCheckFilter = (className) => {
    if (!filters[className]) {
      if (className !== "blendColor") {
        setFilters((prev) => ({
          ...prev,
          [className]: {
            [className]: 0.5,
          },
        }));
      } else {
        setFilters((prev) => ({
          ...prev,
          [className]: {
            value: "#000000",
            alpha: 0.5,
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
    if (!canvas) return;

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
    setGlobalProperties((prev) => ({
      ...prev,
      Images: {
        ...prev.Image,
        Image: [coords],
        filters: filters,
      },
    }));
  }, [filters, coords, fabricRef]);

  return { filters, handleCheckFilter, handleValuesChange, elements, handleModeChange, handleAlphaChange };
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

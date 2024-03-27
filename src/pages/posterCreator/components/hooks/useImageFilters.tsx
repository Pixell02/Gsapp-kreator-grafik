import { fabric } from "fabric";
import useFilters from "./useFilters";
import { useEffect } from "react";
import {
  ActiveObjectCoords,
  BlendColorFilter,
  BrightnessFilter,
  ContrastFilter,
  FabricReference,
  FilterParameters,
  Filters,
  SaturationFilter,
} from "../../../../types/creatorComponentsTypes";
import { IGrayscaleFilter } from "fabric/fabric-impl";

const useImageFilters = (fabricRef: FabricReference, coords: ActiveObjectCoords) => {
  const { filters, setFilters } = useFilters(fabricRef, coords);

  const handleAlphaChange = (className: string, alpha: number) => {
    setFilters({
      ...filters,
      [className]: {
        ...(filters?.[className] as BlendColorFilter),
        alpha: alpha / 100,
      },
    });
  };

  const handleModeChange = (mode: string, className: string) => {
    setFilters({
      ...filters,
      [className]: {
        ...(filters?.[className] as BlendColorFilter),
        mode: mode,
      },
    });
  };

  const handleCheckFilter = (className: string) => {
    if (!filters?.[className]) {
      if (className !== "blendColor") {
        setFilters({
          ...filters,
          [className]: {
            [className]: 0,
          },
        } as Filters);
      } else {
        setFilters({
          ...filters,
          [className]: {
            color: "#000000",
            alpha: 0,
            blendMode: "add",
          },
        } as Filters);
      }
    } else {
      const updatedFilters = Object.keys(filters).reduce((acc: Filters, key) => {
        if (key !== className) {
          acc[key] = filters[key];
        }
        return acc;
      }, {});
      setFilters(updatedFilters);
    }
  };

  const handleValuesChange = (className: string, value: number | string) => {
    if (className !== "blendColor") {
      setFilters({
        ...filters,
        [className]: {
          ...filters?.[className],
          [className]: Number(value) / 100 - 0.5,
        },
      } as Filters);
    } else {
      setFilters({
        ...filters,
        [className]: {
          ...filters?.[className],
          color: value as string,
        },
      } as Filters);
    }
  };

  useEffect(() => {
    if (!fabricRef?.current) return;
    const canvas = fabricRef.current;
    if (!canvas || !filters) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    const activeFilters = Object.keys(filters).reduce((acc: Filters[], filterName) => {
      if (filters[filterName]) {
        const filter = addDefaultFilter(filterName, filters[filterName]);

        if (filter) {
          acc.push(filter as Filters);
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

type FilterConstructorMap = {
  [key: string]: (filters: keyof FilterParameters) => FilterParameters;
};

const addDefaultFilter = <T extends keyof FilterParameters>(filterName: string, filters: Filters[T]) => {
  const filterConstructors: FilterConstructorMap = {
    contrast: (filters: ContrastFilter) => new fabric.Image.filters.Contrast({ ...filters }),
    brightness: (filters: BrightnessFilter) => new fabric.Image.filters.Brightness({ ...filters }),
    saturation: (filters: SaturationFilter) => new fabric.Image.filters.Saturation({ ...filters }),
    blendColor: (filters: BlendColorFilter) => new fabric.Image.filters.BlendColor({ ...filters }),
    grayScale: (filters: IGrayscaleFilter) => new fabric.Image.filters.Grayscale({ ...filters }),
  };
  const filterConstructor = filterConstructors[filterName as keyof FilterConstructorMap];
  if (filterConstructor) {
    return filterConstructor(filters as keyof FilterParameters);
  }
};

export default useImageFilters;

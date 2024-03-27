import { useEffect, useState } from "react";
import useFiltersArray from "./useFiltersArray";
import { ActiveObjectCoords, FabricReference, Filters } from "../../../../types/creatorComponentsTypes";

const useFilters = (fabricRef: FabricReference, coords: ActiveObjectCoords) => {
  const [filters, setFilters] = useState<Filters | null>(null);
  const handleReadFilters = useFiltersArray();

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas?._objects) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (activeObject.type !== "FilteredImage") return;
    const Filters = handleReadFilters(activeObject.filters as Filters[]);
    setFilters(Filters);
  }, [fabricRef, coords, setFilters]);

  return { filters, setFilters };
};

export default useFilters;

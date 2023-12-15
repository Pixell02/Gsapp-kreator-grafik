import React, { useEffect, useState } from 'react'
import useFiltersArray from './useFiltersArray';

const useFilters = (fabricRef, coords) => {

  const [filters, setFilters] = useState(null);
  const handleReadFilters = useFiltersArray();

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas?._objects) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (activeObject.type !== "FilteredImage") return;
    const Filters = handleReadFilters(activeObject.filters);
    setFilters(Filters)
  },[fabricRef, coords, setFilters])

  return {filters, setFilters}
}

export default useFilters

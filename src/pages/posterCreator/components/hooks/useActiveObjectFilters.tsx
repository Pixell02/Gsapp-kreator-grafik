import { useEffect, useState } from "react";
import { FabricReference, Filters } from "../../../../types/creatorComponentsTypes";

const useActiveObjectFilters = (fabricRef: FabricReference) => {
  const [objectFilters, setObjectFilters] = useState<Filters[] | null>(null);

  useEffect(() => {
    if (!fabricRef?.current) return;
    const canvas = fabricRef.current;
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (!activeObject?.filters && !activeObject?.filters?.length) return;
    setObjectFilters(activeObject.filters);
  }, [fabricRef.current?.getActiveObject]);

  return { objectFilters };
};

export default useActiveObjectFilters;

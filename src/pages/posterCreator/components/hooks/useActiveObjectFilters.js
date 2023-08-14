import React, { useEffect, useState } from 'react'

const useActiveObjectFilters = (fabricRef) => {

  const [objectFilters, setObjectFilters] = useState(null);

  useEffect(() => {

    if (!fabricRef?.current) return;
    const canvas = fabricRef.current;
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (!activeObject.filters.length) return;
    setObjectFilters(activeObject.filters);


  },[fabricRef])


  return {objectFilters}
}

export default useActiveObjectFilters

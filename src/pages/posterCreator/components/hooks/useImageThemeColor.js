import React, { useEffect, useState } from 'react'
import useBackgroundContext from './useBackgroundContext';
import useGlobalPropertiesContext from './useGlobalPropertiesContext';

const useImageThemeColor = (fabricRef) => {

  const { color } = useBackgroundContext();
  const { globalProperties } = useGlobalPropertiesContext();
  const [keysAndFill, setKeysAndFill] = useState({});

  const fill = "";

  useEffect(() => {
    if (fabricRef.current?._objects) { 
      const objectFill = {};
      globalProperties?.Images?.forEach((item) => {
        const fill = item.filters?.blendColor?.themeOption.find((option) => option.label === color);
        if (fill) objectFill[item.className] = fill.color;
      })
      setKeysAndFill(objectFill);
    }
  }, [color, globalProperties, fabricRef])
  
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas?._objects) return;
    const objects = canvas.getObjects();
    if (!objects) return;
    const keys = Object.keys(keysAndFill);
    for (const key of keys) {
      objects.forEach((item) => {
        if (item?.className === key && keysAndFill[key]) {
          const index = item.filters.findIndex((option) => option.alpha);
          console.log(keysAndFill[key])
          item.filters[index].color = keysAndFill[key];
          item.applyFilters();
          fabricRef.current.renderAll();
        }
      });
    }
    fabricRef.current.renderAll();
  }, [keysAndFill, fabricRef]);


  return fill;
}

export default useImageThemeColor

import { useEffect, useState } from "react";
import useBackgroundContext from "./useBackgroundContext";
import useGlobalPropertiesContext from "./useGlobalPropertiesContext";

const useTextFillChange = (fabricRef) => {
  const { color } = useBackgroundContext();
  const { globalProperties } = useGlobalPropertiesContext();
  const [keysAndFill, setKeysAndFill] = useState({});
  const fill = "asdasdasd";

  useEffect(() => {
    if (fabricRef.current?._objects) {
      const objectFill = {};
      const keys = Object.keys(globalProperties);
      for (const key of keys) {
        if (Array.isArray(globalProperties[key])) {
          globalProperties[key].forEach((item) => {
            const fill = item.themeOption.find((option) => option.label === color);
            if (fill) objectFill[item.className] = fill.Fill;
          });
        } else {
          const fill = globalProperties?.[key]?.themeOption?.find((option) => option.label === color);
          if (fill) objectFill[globalProperties[key].className] = fill.Fill;
        }
      }
      setKeysAndFill(objectFill);
    }
  }, [color, globalProperties, fabricRef]);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas?._objects) return;
    const objects = canvas.getObjects();
    if (!objects) return;
    const keys = Object.keys(keysAndFill);
    for (const key of keys) {
      objects.forEach((item) => {
        console.log(item.className, keysAndFill[key])
        if (item?.className === key && keysAndFill[key]) {
          
          item.set("fill", keysAndFill[key]);
        }
      });
    }
    fabricRef.current.renderAll();
  }, [keysAndFill, fabricRef]);

  return fill;
};

export default useTextFillChange;

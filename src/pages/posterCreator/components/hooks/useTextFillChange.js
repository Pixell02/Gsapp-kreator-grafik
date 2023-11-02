import { useEffect } from "react";
import useBackgroundContext from "./useBackgroundContext";
import useGlobalPropertiesContext from "./useGlobalPropertiesContext";

const useTextFillChange = (fabricRef, coords) => {
  const { color } = useBackgroundContext();
  const { globalProperties } = useGlobalPropertiesContext();
  const themeOptions = globalProperties?.[coords.className]?.themeOption;
  const themeOption = themeOptions?.find((option) => option.label === color.name);

  const fill = themeOption ? themeOption.Fill : coords.Fill;

  useEffect(() => {
    if (fabricRef.current?.backgroundImage) {
      const canvas = fabricRef.current;

      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set("fill", fill);
        canvas.renderAll();
      }
    }
  }, [fill, color, fabricRef]);

  return fill;
};

export default useTextFillChange;

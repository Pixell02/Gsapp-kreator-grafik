import { useEffect, useState } from "react";
import { useGlobalPropertiesContext } from "../../Context/GlobalProperitesContext";
import { useBackgroundContext } from "../../Context/BackgroundContext";
import { FabricReference } from "../../../../types/creatorComponentsTypes";
import { Text } from "../../../../types/globalPropertiesTypes";

interface KeysAndFill {
  [key: string]: string;
}

interface UseTextFillChangeReturn {
  keysAndFill: KeysAndFill;
}

const useTextFillChange = (fabricRef: FabricReference): UseTextFillChangeReturn => {
  const { color } = useBackgroundContext();
  const { globalProperties } = useGlobalPropertiesContext();
  const [keysAndFill, setKeysAndFill] = useState<KeysAndFill>({});

  useEffect(() => {
    if (fabricRef.current?._objects) {
      const objectFill: KeysAndFill = {};
      const keys = Object.keys(globalProperties);
      for (const key of keys) {
        if (Array.isArray(globalProperties[key])) {
          (globalProperties[key] as Text[]).forEach((item) => {
            const fill = item.themeOption?.find((option) => option.label === color);
            if (fill) objectFill[item.className] = fill.Fill;
          });
        } else {
          const fill = (globalProperties[key] as Text).themeOption?.find((option) => option.label === color);
          if (fill) objectFill[(globalProperties[key] as Text)?.className || ""] = fill.Fill;
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
        if (item?.className === key && keysAndFill[key]) {
          item.set("fill", keysAndFill[key]);
        }
      });
    }
    fabricRef.current.renderAll();
  }, [keysAndFill, fabricRef]);

  return { keysAndFill };
};

export default useTextFillChange;

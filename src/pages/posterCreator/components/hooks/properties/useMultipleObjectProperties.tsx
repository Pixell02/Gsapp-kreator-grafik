import { FabricReference } from "../../../../../types/creatorComponentsTypes";
import { useMultiPropertiesContext } from "../../../Context/MultiPropertiesContext";

type ObjectProperties = {
  top: number | null;
  left: number | null;
  scaleX: number | null;
  scaleY: number | null;
};

const useMultipleObjectProperties = (fabricRef: FabricReference) => {
  const { properties } = useMultiPropertiesContext();

  const handlePropertiesChange = () => {
    if (fabricRef.current?._objects) {
      const canvas = fabricRef.current;
      const activeObject = canvas.getActiveObject();
      const objectProperties: ObjectProperties = {
        top: null,
        left: null,
        scaleX: null,
        scaleY: null,
      };
      fabricRef.current._objects.forEach((object) => {
        if (
          object.type === "multiplyimage" ||
          object.type === "multiplyText" ||
          object.type === "multiplyUniversalText"
        ) {
          if (object.className === activeObject?.className) {
            if (object.index !== 1) {
              object.set(
                "top",
                properties.orientation === "vertically"
                  ? properties.rollAfter > 0
                    ? (objectProperties?.top as number) +
                      ((object.index - 1) % properties.rollAfter) * properties.Margin
                    : (objectProperties?.top as number) + (object.index - 1) * properties.Margin
                  : properties.rollAfter > 0 && object.index / properties.rollAfter > 1
                  ? (objectProperties?.top as number) +
                    properties.MarginAfterRoll *
                      Math.floor(
                        properties.rollAfter > 0 ? (object.index - 1) / properties.rollAfter : object.index - 1
                      )
                  : (objectProperties?.top as number)
              );

              object.set(
                "left",
                properties.orientation === "horizontally"
                  ? properties.rollAfter > 0
                    ? (objectProperties?.left as number) +
                      ((object.index - 1) % properties.rollAfter) * properties.Margin
                    : (objectProperties?.left as number) + (object.index - 1) * properties.Margin
                  : properties.rollAfter > 0 && object.index / properties.rollAfter > 1
                  ? (objectProperties?.left as number) +
                    properties.MarginAfterRoll *
                      Math.floor(
                        properties.rollAfter > 0 ? (object.index - 1) / properties.rollAfter : object.index - 1
                      )
                  : (objectProperties?.left as number)
              );
              object.set("scaleX", objectProperties.scaleX as number);
              object.set("scaleY", objectProperties.scaleY as number);
            } else {
              objectProperties.top = object.top as number;
              objectProperties.left = object.left as number;
              objectProperties.scaleX = object.scaleX as number;
              objectProperties.scaleY = object.scaleY as number;
            }
          }
        }
        fabricRef.current.renderAll();
      });
    }
  };

  return { handlePropertiesChange };
};

export default useMultipleObjectProperties;

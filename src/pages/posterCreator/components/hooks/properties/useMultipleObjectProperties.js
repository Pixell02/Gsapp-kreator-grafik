import { useMultiPropertiesContext } from "../useMultiPropertiesContext";

const useMultipleObjectProperties = (fabricRef) => {
  const { properties } = useMultiPropertiesContext();

  const handlePropertiesChange = () => {
    if (fabricRef.current?._objects) {
      const canvas = fabricRef.current;
      const activeObject = canvas.getActiveObject();
      const objectProperties = {
        top: null,
        left: null,
        scaleX: null,
        scaleY: null,
      };
      fabricRef.current._objects.forEach((object) => {
        if (object.type === "multiplyimage" || object.type === "multiplyText" || object.type === "multiplyUniversalText") {
          if (object.className === activeObject.className) {
            if (object.index !== 1) {
              object.set(
                "top",
                properties.orientation === "vertically"
                  ? objectProperties?.top + (object.index - 1) * properties.Margin
                  : objectProperties?.top
              );
              object.set(
                "left",
                properties.orientation === "horizontally"
                  ? objectProperties?.left + (object.index - 1) * properties.Margin
                  : objectProperties?.left
              );
              object.set("scaleX", objectProperties.scaleX);
              object.set("scaleY", objectProperties.scaleY);
            } else {
              objectProperties.top = object.top;
              objectProperties.left = object.left;
              objectProperties.scaleX = object.scaleX;
              objectProperties.scaleY = object.scaleY;
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

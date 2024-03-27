import { KeyboardEvent } from "react";
import { FabricReference } from "../../../../types/creatorComponentsTypes";
import { useGlobalPropertiesContext } from "../../Context/GlobalProperitesContext";
import { Text } from "../../../../types/globalPropertiesTypes";

const useHandleKeyPress = (fabricRef: FabricReference) => {
  const { globalProperties, setGlobalProperties } = useGlobalPropertiesContext();
  const handleDeleteKeyPress = (e: KeyboardEvent) => {
    if (e.keyCode === 46) {
      const activeObject = fabricRef.current.getActiveObject();
      const fabricObjects = fabricRef.current.getObjects();
      const keyMap: { [key: string]: string } = {
        universalText: "Text",
        universalTextBox: "TextBox",
        multiplyUniversalText: "TextOne",
        playerImage: "playerImage",
        playerGoal: "player",
      };
      if (activeObject) {
        const { className, type } = activeObject;
        if (keyMap[type as string]) {
          const key = keyMap[type as string];
          const updatedProperties = { ...globalProperties };
          if (updatedProperties[key]) {
            const indexToRemove = (updatedProperties[key] as Text[])?.findIndex((prop) => prop.className === className);
            if (indexToRemove !== -1) {
              (updatedProperties[key] as Text[]).splice(indexToRemove, 1);
            }

            fabricRef.current.remove(activeObject);
            const filteredObjects = fabricObjects.filter((prop) => prop.className === className);
            if (filteredObjects) {
              for (const object of filteredObjects) {
                fabricRef.current.remove(object);
              }
            }
            fabricRef.current.renderAll();
          }
          setGlobalProperties(updatedProperties);
        } else if (className === "image") {
          fabricRef.current.remove(activeObject);
          const updatedProperties = { ...globalProperties };
          const indexToRemove = (updatedProperties[className] as Text[]).findIndex(
            (prop) => prop.className === className
          );
          if (indexToRemove !== -1) {
            updatedProperties.Text?.splice(indexToRemove, 1);
            setGlobalProperties(updatedProperties);
          }
          const filteredObjects = fabricObjects.filter((prop) => prop.className === className);
          if (filteredObjects) {
            for (const object of filteredObjects) {
              fabricRef.current.remove(object);
            }
          }
        } else {
          fabricObjects.forEach((object) => {
            if (object.className === className) {
              fabricRef.current.remove(object);
              const updatedProperties = { ...globalProperties };
              delete updatedProperties[className as string];
              setGlobalProperties(updatedProperties);
            }
          });
          const filteredObjects = fabricObjects.filter((prop) => prop.className === className);
          if (filteredObjects) {
            for (const object of filteredObjects) {
              fabricRef.current.remove(object);
            }
          }
        }
        fabricRef.current.renderAll();
      }
    }
  };
  return { handleDeleteKeyPress };
};

export default useHandleKeyPress;

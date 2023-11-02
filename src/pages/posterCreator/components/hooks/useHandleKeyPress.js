import useGlobalPropertiesContext from "./useGlobalPropertiesContext";

const useHandleKeyPress = (fabricRef) => {
  
  const { globalProperties, setGlobalProperties } = useGlobalPropertiesContext();
  const handleDeleteKeyPress = (e) => {
    if (e.keyCode === 46) {
      const activeObject = fabricRef.current.getActiveObject();
      const fabricObjects = fabricRef.current.getObjects();
      const keyMap = {
        universalText: "Text",
        universalTextBox: "TextBox",
        multiplyUniversalText: "TextOne",
        playerImage: "playerImage",
      };
      if (activeObject) {
        const { className, type } = activeObject;
        if (keyMap[type]) {
          const key = keyMap[type];
          const updatedProperties = { ...globalProperties };
          if (updatedProperties[key]) {
            const indexToRemove = updatedProperties[key].findIndex((prop) => prop.className === className);
            if (indexToRemove !== -1) {
              updatedProperties[key].splice(indexToRemove, 1);
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
          const indexToRemove = updatedProperties[className].findIndex((prop) => prop.className === className);
          if (indexToRemove !== -1) {
            updatedProperties.Text.splice(indexToRemove, 1);
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
              delete updatedProperties[className];
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

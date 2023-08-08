import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { GlobalPropertiesContext } from "../../Context/GlobalProperitesContext";
import { useMultiPropertiesContext } from "./useMultiPropertiesContext";
import useAddMultiplyLayer from "./useAddMultiplyLayer";
import { layersName } from "../../layersName";

const useSetMultiplyProperties = (fabricRef) => {
  const { globalProperties, setGlobalProperties } = useContext(GlobalPropertiesContext);
  const { properties, setProperties } = useMultiPropertiesContext();
  const { handleCreateImage, handleCreateText } = useAddMultiplyLayer(fabricRef);
  console.log(globalProperties, properties)
  useEffect(() => {
    let objectProperties = new Object();
    fabricRef.current._objects.forEach((object) => {
      if (object.type === "multiplyimage" || object.type === "multiplyText") {
     
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
          objectProperties = {
            top: object.top,
            left: object.left,
            scaleX: object.scaleX,
            scaleY: object.scaleY
          };
        }
      }
      fabricRef.current.renderAll();
    });
    setGlobalProperties((prev) => ({
      ...prev,
      ...properties
    }))
  }, [properties]);

  const handleNumberOfMatchesChange = (e) => {
    const newNumberOfMatches = parseInt(e.target.value, 10);
    setProperties((prev) => ({ ...prev, numberOfMatches: newNumberOfMatches }));

    const canvasObjects = fabricRef.current._objects;
    const multiplyObject = canvasObjects.filter((object) => {
      return object.index === properties.numberOfMatches;
    });

    const length = multiplyObject[0].index;
    if (newNumberOfMatches < length) {
      const objectsToRemove = multiplyObject;
      objectsToRemove.forEach((object) => fabricRef.current.remove(object));
    } else if (newNumberOfMatches > length) {
      const objectsToAddCount = newNumberOfMatches - length;
      for (let i = 0; i < objectsToAddCount; i++) {
        multiplyObject.forEach((object) => {
          layersName.forEach((layer) => {
            if (object.type === "multiplyimage" && object.className === layer.className) {
              handleCreateImage(layer.image, object);
            } else if (object.type === "multiplyText" && object.className === layer.className) {
            }
          });
        });
      }
    }
  };
  const handleMarginChange = (e) => {
    setProperties((prev) => ({ ...prev, Margin: parseInt(e.target.value) }));
    let startPosition;
    fabricRef.current._objects.forEach((object) => {
      if (object.index === 1) {
        if (properties.orientation === "vertically") {
          startPosition = object.top;
        } else {
          startPosition = object.left;
        }
      } else {
        if (properties.orientation === "vertically") {
          object.set("top", startPosition + e.target.value * (object.index - 1));
        } else {
          object.set("left", startPosition + e.target.value * (object.index - 1));
        }
      fabricRef.current.renderAll();
      }
      
    });
  };
  const handleOrientationChange = (option) => {
    setProperties((prev) => ({ ...prev, orientation: option.value }));
  };

  return { globalProperties, properties, handleNumberOfMatchesChange, handleMarginChange, handleOrientationChange };
};

export default useSetMultiplyProperties;

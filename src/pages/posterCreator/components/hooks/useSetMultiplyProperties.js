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

  useEffect(() => {
    let iteration = 1;
    let objectProperties = new Object();
    fabricRef.current._objects.forEach((object) => {
      if (object.className === "yourTeamLogoOne") {
        if (iteration !== 1) {
          object.set(
            "top",
            properties.orientation === "vertically"
              ? objectProperties?.top + iteration * properties.Margin
              : objectProperties?.top
          );
          object.set(
            "left",
            properties.orientation === "horizontally"
              ? objectProperties?.left + iteration * properties.Margin
              : objectProperties?.left
          );
        } else {
          objectProperties = {
            top: object.top,
            left: object.left,
          };
        }
        iteration++;
      }
      fabricRef.current.renderAll();
    });
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
    setProperties((prev) => ({ ...prev, Margin: e.target.value }));
    let startPosition;
    fabricRef.current._objects.forEach((object, i) => {
      if (i === 0) {
        startPosition = object.top;
      }
      object.set("top", startPosition + e.target.value * i);
      fabricRef.current.renderAll();
    });
  };
  const handleOrientationChange = (option) => {
    setProperties((prev) => ({ ...prev, orientation: option.value }));
  };

  return { globalProperties, properties, handleNumberOfMatchesChange, handleMarginChange, handleOrientationChange };
};

export default useSetMultiplyProperties;

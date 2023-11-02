import { useState } from "react";

import {
  createFabricImage,
  createFabricText,
  createFabricTextBox,
  createMultiplyImage,
  createMultiplyText,
  createPlayerImage,
  createPlayerNameText,
  createUniversalMultiplyText,
  createUniversalText,
  createUniversalTextBox,
} from "./createFabricObject";
import { useMultiPropertiesContext } from "./useMultiPropertiesContext";

export const useAddFabricObject = (fabricRef) => {
  const { setIsMany, properties } = useMultiPropertiesContext();

  const handleAddObject = (e, layer) => {
    if (layer.type === "image") {
      createFabricImage(fabricRef, layer.className, layer.image, layer.type);
    } else if (layer.type === "FilteredImage") {
      createFabricImage(fabricRef, layer.className, layer.image, layer.type);
    } else if (layer.type === "text") {
      createFabricText(fabricRef, layer.text, layer.className);
    } else if (layer.type === "textBox") {
      createFabricTextBox(fabricRef, layer.text, layer.className);
    } else if (layer.type === "playerImage") {
      createPlayerImage(fabricRef, layer.className, layer.image, layer.type);
    } else if (layer.type === "playerGoal") {
      createPlayerNameText(fabricRef, layer.text, layer.className);
    } else if (layer.type === "universalText") {
      createUniversalText(fabricRef, layer.text, layer.className);
    } else if (layer.type === "universalTextBox") {
      createUniversalTextBox(fabricRef, layer.text, layer.className);
    } else if (layer.type === "multiplyImage") {
      createMultiplyImage(fabricRef, layer.className, layer.image, properties.numberOfMatches);
      setIsMany(true);
    } else if (layer.type === "multiplyText") {
      createMultiplyText(fabricRef, layer.className, layer.text, properties.numberOfMatches);
      setIsMany(true);
    } else if (layer.type === "multiplyUniversalText") {
      createUniversalMultiplyText(fabricRef, layer.className, layer.text, properties.numberOfMatches);
      setIsMany(true);
    } else if (layer.type === "multiplyUniversalNumber") {
      createUniversalMultiplyText(fabricRef, layer.className, layer.text, properties.numberOfMatches);
      setIsMany(true);
    }
  };

  return { handleAddObject };
};

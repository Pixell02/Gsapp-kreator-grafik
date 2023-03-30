import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import yourTeamLogo from "../../../../img/crest_2.png";
import opponentTeamLogo  from "../../../../img/crest_1.png";
import { createFabricImage, createFabricText, createFabricTextBox, createMultiplyText } from "./createFabricObject";

export const useAddFabricObject = (fabricRef) => {
  const [fabricObject, setFabricObject] = useState([]);
  const [fabricObjectProperties, setFabricObjectProperties] = useState({});
  
  const handleAddObject = (e,layer) => {
    
    if (layer.type === "image") {
      
      createFabricImage(fabricRef, setFabricObject,layer.className,layer.image)
    } else if (layer.type === "text") {
      createFabricText(fabricRef, setFabricObject, layer.text, layer.className)
    } else if (layer.type === "textBox") {
      createFabricTextBox(fabricRef, setFabricObject, layer.text, layer.className)
    } else {
      createMultiplyText(fabricRef, setFabricObject, layer.text, layer.className, layer.loops)
    }
    e.target.blur();
  }
  
  return {handleAddObject}
}
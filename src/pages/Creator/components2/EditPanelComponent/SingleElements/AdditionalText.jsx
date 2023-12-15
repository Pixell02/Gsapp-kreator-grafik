import React, { useContext } from 'react'
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

import radioContext from '../../../context/radioContext';
import { useEffect } from 'react';


export default function AdditionalText({ fabricRef, coords, posterBackground}) {
  const { radioChecked } = useContext(radioContext);
  
  useEffect(() => {
    if (fabricRef.current?._objects && coords) {
    // additionalText(fabricRef, coords, radioChecked)
       fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "addedText") {
          fabricRef.current.remove(fabricRef.current.item(i));
          fabricRef.current.renderAll();
        }
      });
    const font = new FontFaceObserver(coords.additionalText.FontFamily);
    font.load().then(() => {
      
      const text = new fabric.Text(coords.additionalText.value, {
        top: radioChecked === "radio1" ? coords.additionalText.Top : coords.additionalText.Top2,
        left:radioChecked === "radio1" ? coords.additionalText.Left : coords.additionalText.Left2,
        fontFamily: coords.additionalText.FontFamily,
        fontSize: coords.additionalText.FontSize,
        selectable: false,
        zIndex:5,
        fill: coords.additionalText.Fill,
        className: "addedText",
        originX: coords.additionalText.OriginX,
        originY: coords.additionalText.OriginY,
      });
      
      fabricRef.current.add(text);
      fabricRef.current.renderAll();
    });
  }     
  },[fabricRef.current, posterBackground, radioChecked])

     
 
  return (
    <></>
  )
}

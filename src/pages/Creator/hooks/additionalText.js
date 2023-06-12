import React from "react";
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";

function additionalText(fabricRef, props) {
  
  if (props.coords.additionalText) {
    
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "addedText") {
          fabricRef.current.remove(fabricRef.current.item(i));
          fabricRef.current.renderAll();
        }
      });
    
    const font = new FontFaceObserver(props.coords.additionalText.FontFamily);
    font.load().then(() => {
      
      const text = new fabric.Text(props.coords.additionalText.value, {
        top: props.radioChecked === "radio1" ? props.coords.additionalText.Top : props.coords.additionalText.Top2,
        left:props.radioChecked === "radio1" ? props.coords.additionalText.Left : props.coords.additionalText.Left2,
        fontFamily: props.coords.additionalText.FontFamily,
        fontSize: props.coords.additionalText.FontSize,
        selectable: false,
        fill: props.coords.additionalText.Fill,
        className: "addedText",
        originX: props.coords.additionalText.OriginX,
        originY: props.coords.additionalText.OriginY,
      });
      
      fabricRef.current.add(text);
      fabricRef.current.renderAll();
    });
  }
}

export default additionalText;

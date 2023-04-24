import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function manyDatas(fabricRef, props, loops) {
  if (props.textInputValues && props.coords.typeDataOne) {
    
    const font = new FontFaceObserver(props.coords.typeDataOne.FontFamily);
    if (loops) {
      loops.forEach((loop, i) => {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "data-text") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        font.load().then(() => {
         
          if (props.coords.dataType !== "vertical") {
            const dataText = new fabric.Text(props.textInputValues[i], {
              selectable: false,
              className: "data-text",
              top: props.coords.typeDataOne.Top + i * props.coords.typeDataOne.Margin,
              left: props.coords.typeDataOne.Left,
              fontFamily: props.coords.typeDataOne.FontFamily,
              fontSize: props.coords.typeDataOne.FontSize,
              fill: props.coords.typeDataOne.Fill,
              originX: props.coords.typeDataOne.OriginX,
              originY: props.coords.typeDataOne.OriginY
            });
          
            if (dataText.width > props.coords.typeDataOne.ScaleToWidth) {
              dataText.scaleToWidth(props.coords.typeDataOne.ScaleToWidth)
            }
            console.log(dataText)
            fabricRef.current.add(dataText);
          } else {
            const dataText = new fabric.Text(props.textInputValues[i], {
              selectable: false,
              className: "data-text",
              top: props.coords.typeDataOne.Top,
              left: props.coords.typeDataOne.Left + i * props.coords.typeDataOne.Margin,
              fontFamily: props.coords.typeDataOne.FontFamily,
              fontSize: props.coords.typeDataOne.FontSize,
              fill: props.coords.typeDataOne.Fill,
              originX: props.coords.typeDataOne.OriginX,
              originY: props.coords.typeDataOne.OriginY
            });
            
            if (dataText.width > props.coords.typeDataOne.ScaleToWidth) {
              dataText.scaleToWidth(props.coords.typeDataOne.ScaleToWidth)
            }
            console.log(dataText)
            fabricRef.current.add(dataText);
          }
        });
      });
    }
  }
}

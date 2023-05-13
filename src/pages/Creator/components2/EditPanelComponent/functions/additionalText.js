import React from 'react'
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";

export default function additionalText(fabricRef, coords, radioChecked) {
  console.log(radioChecked)
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "addedText") {
      fabricRef.current.remove(fabricRef.current.item(i));
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
    fill: coords.additionalText.Fill,
    className: "addedText",
    originX: coords.additionalText.OriginX,
    originY: coords.additionalText.OriginY,
  });
  console.log(text)
  fabricRef.current.add(text);
  fabricRef.current.renderAll();
});
}

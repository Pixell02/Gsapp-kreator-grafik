import React from 'react'
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function typeMonth(fabricRef, props) {
  if (props.month && props.coords.typeMonth) {
    fabricRef.current._objects.forEach((image, i) => {
      if (fabricRef.current.item(i).className === "month") {
        fabricRef.current.remove(fabricRef.current.item(i));
      }
    });
    const font = new FontFaceObserver(props.coords.typeMonth.FontFamily)
    font.load().then(() => {
      const monthText = new fabric.Text(props.month, {
        selectable: false,
        className: "month",
        top: props.coords.typeMonth.Top,
        left: props.coords.typeMonth.Left,
        charSpacing: props.coords.typeMonth.CharSpacing,
        fontFamily: props.coords.typeMonth.FontFamily,
        fontSize: props.coords.typeMonth.FontSize,
        width: props.coords.typeMonth.ScaleToWidth,
        fill: props.coords.typeMonth.Fill,
        originX: props.coords.typeMonth.OriginX,
        originY: props.coords.typeMonth.OriginY
      })
      if (monthText.width > props.coords.typeMonth.ScaleToWidth) {
        monthText.scaleToWidth(props.coords.typeMonth.ScaleToWidth)
      }
      fabricRef.current.add(monthText)
    })
  }
}

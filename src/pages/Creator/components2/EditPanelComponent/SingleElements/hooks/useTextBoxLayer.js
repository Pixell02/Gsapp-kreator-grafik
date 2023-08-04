import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";

const useTextBoxLayer = (coords, fabricRef) => {

  const [textValue, setTextValue] = useState(null);

  useEffect(() => {
    if (textValue && fabricRef.current) {
      fabricRef.current._objects.forEach((item, i) => {
      if (item.className === coords.className) {
          fabricRef.current.remove(item);
      }
      });
      fabricRef.current.renderAll();
      const font = new FontFaceObserver(coords.FontFamily);
      font.load().then(() => {
        const typeDate = new fabric.Textbox(textValue, {
          selectable: false,
          top: coords.Top,
          left: coords.Left,
          className: coords.className,
          fontSize: coords.FontSize,
          width: coords.ScaleToWidth,
          fill: coords.Fill,
          originX: coords.OriginX,
          originY: coords.OriginY,
          textAlign: coords.TextAlign,
          splitByGrapheme: true,
          fontFamily: coords.FontFamily,
          angle: (coords.Angle || 0),
          charSpacing: coords.CharSpacing ? coords.CharSpacing : 0,
          fontStyle: coords.FontStyle ? coords.FontStyle : "normal",
        });
        
        if (typeDate.width >= coords.ScaleToWidth) {
          typeDate.scaleToWidth(coords.ScaleToWidth);
          if (coords?.Angle > 0) {
            typeDate.scaleToHeight(coords.ScaleToWidth);
          }
        }
        if (typeDate.height >= coords.ScaleToHeight) {
          // typeDate.scaleToHeight(coords.ScaleToHeight);
          typeDate._textLines.forEach((lines, i) => {
            const height = typeDate.height;
            while (height > coords.ScaleToHeight) {
              const fontSize = typeDate.get("fontSize");
              typeDate.set("fontSize", fontSize - 1);
              const newheight = typeDate.height;
              if (newheight <= coords.ScaleToHeight) {
                fabricRef.current.renderAll();
                break;
              }
            }
          });
        }
        fabricRef.current.add(typeDate);
        fabricRef.current.renderAll();
      });
    }
  },[textValue, fabricRef.current])

  return {textValue, setTextValue}
}

export default useTextBoxLayer

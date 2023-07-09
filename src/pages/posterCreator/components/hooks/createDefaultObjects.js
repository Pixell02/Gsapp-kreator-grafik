import React from 'react'
import { layersName } from '../../layersName'
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
export default function createDefaultObjects(fabricRef, globalProperties) {
 
  layersName.forEach((layer, i) => {
    for (const key in globalProperties) {
      if (layer.className === key) {
         if (layer.type === "image") {
          
          fabric.Image.fromURL(layer.image, function (img) {
            img.set({
              top: globalProperties[key].Top,
              left: globalProperties[key].Left,
              className: layer.className,
              originX: "center",
              originY: "center",
              type: "image"
            })
            img.scaleToHeight(globalProperties[key].ScaleToHeight)
           
           
            fabricRef.current.add(img);
            fabricRef.current.renderAll();
          })
        } else if (layer.type === "textBox") {
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
          font.load().then(() => {
            const text = new fabric.Textbox(layer.text, {
              top: globalProperties[key].Top,
              left: globalProperties[key].Left,
              fontSize: globalProperties[key].FontSize,
              className: layer.className,
              width: globalProperties[key].ScaleToWidth * 1.2,
              textAlign: globalProperties[key].TextAlign,
              fill: globalProperties[key].Fill,
              fontFamily: globalProperties[key].FontFamily,
              format: globalProperties[key].format,
              originX: globalProperties[key].OriginX,
              originY: globalProperties[key].OriginY,
              type: "textBox",
            })
            fabricRef.current.add(text);
            fabricRef.current.renderAll();
          })
         }else if (layer.type === "multiply") {
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
          font.load().then(() => {
            const text = new fabric.Textbox(layer.text, {
              top: globalProperties[key].Top,
              left: globalProperties[key].Left,
              fontSize: globalProperties[key].FontSize,
              className: layer.className,
              width: globalProperties[key].ScaleToWidth * 1.2,
              textAlign: globalProperties[key].TextAlign,
              fill: globalProperties[key].Fill,
              fontFamily: globalProperties[key].FontFamily,
              format: globalProperties[key].format,
              type: "textBox",
            })
            
            fabricRef.current.add(text);
            fabricRef.current.renderAll();
          })
        }
         else if (layer.type === "text") {
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
          font.load().then(() => {
          const text = new fabric.Text(layer.text, {
            top: globalProperties[key].Top,
            left: globalProperties[key].Left,
            width: globalProperties[key].ScaleToWidth,
            fontSize: globalProperties[key].FontSize,
            className: layer.className,
            fill: globalProperties[key].Fill,
            fontFamily: globalProperties[key].FontFamily,
            type: "text",
            originY: "center",
            originX: globalProperties[key].OriginX
          })
            text.set({
              scaleX: globalProperties[key].ScaleToWidth / text.width
            })
            fabricRef.current.add(text);
            fabricRef.current.renderAll();
          })
         } else if (layer.type === "playerGoal") {
          const text = new fabric.IText(layer.text, {
            top: globalProperties[key].Top,
            left: globalProperties[key].Left,
            fontSize: globalProperties[key].FontSize,
            width: globalProperties[key].width,
            originX: globalProperties[key].OriginX,
            originY: globalProperties[key].OriginY,
            className: "player",
            fill: globalProperties[key].Fill,
            fontFamily: globalProperties[key].FontFamily,
            format: globalProperties[key].Format,
            type: globalProperties[key].Type,
          })
          fabricRef.current.add(text);
          fabricRef.current.renderAll();
        }
      }
    }
  })

}

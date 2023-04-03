import React from 'react'
import { layersName } from '../../layersName'
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
export default function createDefaultObjects(fabricRef, globalProperties, coords) {
  console.log(coords)
  layersName.forEach((layer, i) => {
    for (const key in globalProperties) {
      if (layer.className === key) {
        if (layer.type === "multiply") {
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
            font.load().then(() => {
          const objects = layer.loops.map((loop, i) => {
            
              const text = new fabric.Text(layer.text, {
                top: i * globalProperties[key].Margin,
                left: 200,
                fontSize: globalProperties[key].FontSize,
                className: layer.className,
                fill: globalProperties[key].Fill,
                fontFamily: globalProperties[key].FontFamily,
                type: "multiply",
                fontStyle: globalProperties[key].FontStyle ? globalProperties[key].FontStyle : "normal",
                selectable: i === 0 ? true : false
              })
              return text;
            });
          
          
          const group = new fabric.Group(objects, {
            left: globalProperties[key].Left,
            top: globalProperties[key].Top,
            className: layer.className,
            type: "multiply",
            originY: "top",
            fontSize: globalProperties[key].FontSize,
            fontFamily: globalProperties[key].FontFamily,
            Margin: globalProperties[key].Margin,
            format: globalProperties[key].Format
          });
          
              fabricRef.current.add(group);
            })
        } else if (layer.type === "image") {
          
          fabric.Image.fromURL(layer.image, function (img) {
            img.set({
              top: globalProperties[key].Top,
              left: globalProperties[key].Left,
              className: layer.className,
              originX: "center",
              originY: "center",
              type: "image"
            })
            img.scaleToHeight(globalProperties[key].ScaleToHeight);
           
            fabricRef.current.add(img);
          })
        } else if (layer.type === "textBox") {
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
          font.load().then(() => {
            const text = new fabric.Textbox(layer.text, {
              top: globalProperties[key].Top,
              left: globalProperties[key].Left,
              fontSize: globalProperties[key].FontSize,
              className: layer.className,
              fill: globalProperties[key].Fill,
              fontFamily: globalProperties[key].FontFamily,
              type: "textBox",
            })
            fabricRef.current.add(text);
          })
        } else if (layer.type === "text") {
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
            fabricRef.current.add(text);
          })
        }
      }
    }
  })



}

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
              angle: globalProperties[key]?.Angle,
              originX: "center",
              originY: "center",
              type: "image"
            })
            img.scaleToHeight(globalProperties[key].ScaleToHeight)
           
           
            fabricRef.current.add(img);
            fabricRef.current.renderAll();
          })
         } else if (layer.type === "textBox") {
           let value;
           if (layer.className === "playerOne") {
             if (globalProperties[key].Format === "dotted") {
              value = "88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko";
             } else if (globalProperties[key].Format === "NumSurName") {
              value = "88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko";
             } else if (globalProperties[key].Format === "NumDotSurName") {
              value = "88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko";
             } else if (globalProperties[key].Format === "oneDot") {
              value = "88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko";
             } else if (globalProperties[key].Format === "SurName") {
              value = "Nazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko";
             }
           }
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
          font.load().then(() => {
            const text = new fabric.Textbox(value, {
              top: globalProperties[key].Top,
              left: globalProperties[key].Left,
              fontSize: globalProperties[key].FontSize,
              className: layer.className,
              width: globalProperties[key].ScaleToWidth * 1.2,
              textAlign: globalProperties[key].TextAlign,
              fill: globalProperties[key].Fill,
              fontFamily: globalProperties[key].FontFamily,
              format: globalProperties[key].format,
              angle: globalProperties[key]?.Angle,
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
              angle: globalProperties[key]?.Angle,
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
            angle: globalProperties[key]?.Angle,
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
           let value;
           if (globalProperties[key].Format === "dotted") {
             value = "I.Nazwisko";
           } else if (globalProperties[key].Format === "NumSurName") {
            value = "Imie Nazwisko";
           } else if (globalProperties[key].Format === "SurName") {
            value = "Nazwisko";
           }
          const text = new fabric.IText(value, {
            top: globalProperties[key].Top,
            left: globalProperties[key].Left,
            angle: globalProperties[key]?.Angle,
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

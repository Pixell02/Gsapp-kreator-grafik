import React from "react";
import { layersName } from "../../layersName";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
export default function createDefaultObjects(fabricRef, globalProperties) {
  layersName.forEach((layer, i) => {
    
    for (const key in globalProperties) {
      if (layer.className === key) {
        console.log(key, layer.type)
        if (layer.type === "image") {
          fabric.Image.fromURL(layer.image, function (img) {
            img.set({
              top: globalProperties[key]?.Top,
              left: globalProperties[key]?.Left,
              className: layer.className,
              selectable: true,
              angle: globalProperties[key]?.Angle,
              originX: "center",
              originY: "center",
              type: "image",
            });
            img.scaleToHeight(globalProperties[key]?.ScaleToHeight);
            fabricRef.current.add(img);
            fabricRef.current.renderAll();
          });
        } else if (layer.type === "textBox") {
          let value;

          if (layer.className === "playerOne") {
            if (globalProperties[key].format === "dotted") {
              value =
                "88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko";
            } else if (globalProperties[key].format === "NumSurName") {
              value =
                "88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko";
            } else if (globalProperties[key].format === "NumDotSurName") {
              value =
                "88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko";
            } else if (globalProperties[key].format === "oneDot") {
              value =
                "88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko";
            } else if (globalProperties[key].format === "SurName") {
              value =
                "Nazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko\nNazwisko";
            }
          } else {
            value = layer.text;
          }
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
          font.load().then(() => {
           
            const text = new fabric.Textbox(value, {
              top: globalProperties[key].Top,
              left: globalProperties[key].Left,
              fontSize: globalProperties[key].FontSize,
              className: layer.className,
              width: (globalProperties[key].ScaleToWidth || globalProperties[key].Width) * 1.2,
              textAlign: globalProperties[key].TextAlign,
              fill: globalProperties[key].Fill,
              fontFamily: globalProperties[key].FontFamily,
              format: (globalProperties[key].format || null),
              angle: (globalProperties[key].Angle || null),
              originX: globalProperties[key].OriginX,
              originY: globalProperties[key].OriginY || "top",
              type: "textBox",
            });

            fabricRef.current.add(text);
            fabricRef.current.renderAll();
          });
        }  else if (layer.type === "text") {
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
          font.load().then(() => {
            const text = new fabric.IText(layer.text, {
              top: globalProperties[key]?.Top,
              left: globalProperties[key]?.Left,
              width: globalProperties[key]?.ScaleToWidth,
              charSpacing: (globalProperties[key]?.CharSpacing || 0),
              fontSize: globalProperties[key]?.FontSize,
              textAlign: globalProperties[key]?.TextAlign,
              className: layer.className,
              angle: globalProperties[key]?.Angle,
              fill: globalProperties[key]?.Fill,
              fontFamily: globalProperties[key]?.FontFamily,
              type: "text",
              originY: "center",
              originX: globalProperties[key]?.OriginX,
            });
            
            text.set({
              scaleX: globalProperties[key]?.ScaleToWidth / text.width,
            });
            console.log(text) 
            fabricRef.current.add(text);
            fabricRef.current.renderAll();
          });
        } else if (layer.type === "playerGoal") {
          let value;
          if ((globalProperties[key].Format || globalProperties[key].format) === "dotted") {
            value = "I.Nazwisko";
          } else if ((globalProperties[key].Format || globalProperties[key].format) === "NumSurName") {
            value = "Imie Nazwisko";
          } else if ((globalProperties[key].Format || globalProperties[key].format) === "SurName") {
            value = "Nazwisko";
          }
          
          const text = new fabric.IText(value, {
            top: globalProperties[key].Top,
            left: globalProperties[key].Left,
            angle: globalProperties[key]?.Angle,
            fontSize: globalProperties[key].FontSize,
            width: globalProperties[key]?.Width,
            originX: globalProperties[key].OriginX,
            originY: globalProperties[key].OriginY,
            className: "player",
            fill: globalProperties[key].Fill,
            fontFamily: globalProperties[key].FontFamily,
            format: globalProperties[key].Format,
            type: globalProperties[key].Type,
          });
          fabricRef.current.add(text);
          fabricRef.current.renderAll();
        } 
      } else {
        if (layer.type === "universalText" && key === "Text") {
          globalProperties?.Text?.forEach((globalProperties) => {
            const text = new fabric.IText("linia tekstu", {
              top: globalProperties.Top,
              left: globalProperties.Left,
              angle: globalProperties?.Angle,
              fontSize: globalProperties.FontSize,
              width: globalProperties.width,
              originX: globalProperties.OriginX,
              originY: globalProperties.OriginY,
              className: globalProperties.className,
              fill: globalProperties.Fill,
              fontFamily: globalProperties.FontFamily,
              format: globalProperties.Format,
              type: "universalText",
            });
            fabricRef.current.add(text);
            fabricRef.current.renderAll();
          })
        } else if (layer.type === "universalTextBox" && key === "TextBox") {
          globalProperties?.TextBox.forEach((globalProperties) => {
           
            const text = new fabric.Textbox("pole tekstowe", {
              top: globalProperties.Top,
              left: globalProperties.Left,
              fontSize: globalProperties.FontSize,
              className: globalProperties.className,
              width: (globalProperties.ScaleToWidth || globalProperties.Width) * 1.2,
              textAlign: globalProperties.TextAlign,
              fill: globalProperties.Fill,
              fontFamily: globalProperties.FontFamily,
              format: (globalProperties.format || null),
              angle: (globalProperties.Angle || null),
              originX: globalProperties.OriginX,
              originY: globalProperties.OriginY || "top",
              type: "universalTextBox",
            });
            fabricRef.current.add(text);
            fabricRef.current.renderAll();
          })
        }
      }
    }
  });
}

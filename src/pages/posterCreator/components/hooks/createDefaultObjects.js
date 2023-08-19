import React from "react";
import { layersName } from "../../layersName";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function createDefaultObjects(fabricRef, globalProperties, setIsMany) {
  layersName.forEach((layer, i) => {
    for (const key in globalProperties) {
      if (layer.className === key) {
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
            if ((globalProperties[key]?.Format === "dotted")) {
              value =
                "88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko\n88.I.Nazwisko";
            } else if (globalProperties[key]?.Format === "NumSurName") {
              value =
                "88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko\n88 Nazwisko";
            } else if (globalProperties[key]?.Format === "NumDotSurName") {
              value =
                "88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko\n88.Nazwisko";
            } else if (globalProperties[key]?.Format === "oneDot") {
              value =
                "88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko\n88 I.Nazwisko";
            } else if (globalProperties[key]?.Format === "SurName") {
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
              width: globalProperties[key].ScaleToWidth * 1.2,
              textAlign: globalProperties[key].TextAlign,
              fill: globalProperties[key].Fill,
              fontFamily: globalProperties[key].FontFamily,
              Format: globalProperties[key]?.Format,
              angle: globalProperties[key]?.Angle,
              originX: globalProperties[key].OriginX,
              originY: globalProperties[key].OriginY || "top",
              type: "textBox",
            });
            fabricRef.current.add(text);
            fabricRef.current.renderAll();
          });
        } else if (layer.type === "text") {
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
          font.load().then(() => {
            const text = new fabric.IText(layer.text, {
              top: globalProperties[key]?.Top,
              left: globalProperties[key]?.Left,
              width: globalProperties[key]?.ScaleToWidth,
              charSpacing: globalProperties[key]?.CharSpacing || 0,
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
        } else if (layer.type === "multiplyText") {
          const font = new FontFaceObserver(globalProperties[key].FontFamily);
          font.load().then(() => {
            for (let i = 1; i <= globalProperties.numberOfMatches; i++) {
              const text = new fabric.IText(layer.text, {
                charSpacing: globalProperties[key].CharSpacing || 0,
                top:
                    globalProperties.orientation === "vertically"
                      ? globalProperties[key].Top + globalProperties.Margin * (i - 1)
                      : globalProperties[key].Top,
                  left:
                    globalProperties.orientation === "horizontally"
                      ? globalProperties[key].Left + globalProperties.Margin * (i - 1)
                      : globalProperties[key].Left,
                angle: globalProperties[key]?.Angle,
                fontSize: globalProperties[key].FontSize,
                width: globalProperties[key].Width,
                originX: globalProperties[key].OriginX,
                originY: globalProperties[key].OriginY,
                className: globalProperties[key]?.className || " ",
                fill: globalProperties[key].Fill,
                fontFamily: globalProperties[key].FontFamily,
                index: i,
                id: globalProperties[key].type + i,
                selectable: i !== 1 ? false : true,
                format: globalProperties[key].Format,
                type: layer.type,
              });
              text.set({
                scaleX: globalProperties[key]?.ScaleToWidth / text.width,
              });
              fabricRef.current.add(text);
              fabricRef.current.renderAll();
            }
          });
          setIsMany(true);
        } else if (layer.type === "multiplyimage") {
          for (let i = 1; i <= globalProperties.numberOfMatches; i++) { 
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
          }
          setIsMany(true);
        }
      } else {
        if (layer.type === "universalText" && key === "Text") {
          globalProperties?.Text?.forEach((globalProperties) => {
            const font = new FontFaceObserver(globalProperties.FontFamily);
            font.load().then(() => {
              const text = new fabric.IText("linia tekstu", {
                charSpacing: globalProperties.CharSpacing || 0,
                top: globalProperties.Top,
                left: globalProperties.Left,
                angle: globalProperties?.Angle,
                fontSize: globalProperties.FontSize,
                width: globalProperties.width,
                originX: globalProperties.OriginX,
                originY: globalProperties.OriginY,
                className: globalProperties.className === "" ? "s" : globalProperties.className,
                index: i,
                id: globalProperties.type + i,
                fill: globalProperties.Fill,
                fontFamily: globalProperties.FontFamily,
                format: globalProperties.Format,
                type: "universalText",
              });
              fabricRef.current.add(text);
              fabricRef.current.renderAll();
            });
          });
        } else if (layer.type === "universalTextBox" && key === "TextBox") {
          globalProperties?.TextBox.forEach((globalProperties) => {
            const font = new FontFaceObserver(globalProperties.FontFamily);
            font.load().then(() => {
              const text = new fabric.Textbox("pole tekstowe", {
              top: globalProperties.Top,
              left: globalProperties.Left,
              fontSize: globalProperties.FontSize,
              className: globalProperties?.className || " ",
              width: (globalProperties.ScaleToWidth || globalProperties.Width) * 1.2,
              textAlign: globalProperties.TextAlign,
              index: i,
              id: globalProperties.type + i,
              fill: globalProperties.Fill,
              fontFamily: globalProperties.FontFamily,
              format: globalProperties.format || null,
              angle: globalProperties.Angle || null,
              originX: globalProperties.OriginX,
              originY: globalProperties.OriginY || "top",
              selectable: i !== 1 ? false : true,
              type: "universalTextBox",
            });
            text.set({
              scaleX: globalProperties.ScaleToWidth / text.width,
            });
            fabricRef.current.add(text);
            fabricRef.current.renderAll();
            })
            
          });
        } else if (layer.type === "multiplyUniversalText" && key === "TextOne") {
          globalProperties?.TextOne.forEach((properties) => {
            const font = new FontFaceObserver(properties.FontFamily);
            font.load().then(() => {
              for (let i = 1; i <= globalProperties.numberOfMatches; i++) {
                const text = new fabric.IText(layer.text, {
                  charSpacing: properties.CharSpacing || 0,
                  top:
                    globalProperties.orientation === "vertically"
                      ? properties.Top + globalProperties.Margin * (i - 1)
                      : properties.Top,
                  left:
                    globalProperties.orientation === "horizontally"
                      ? properties.Left + globalProperties.Margin * (i - 1)
                      : properties.Left,
                  fontSize: properties.FontSize,
                  index: i,
                  className: properties?.className || " ",
                  id: properties.type + i,
                  width: properties.ScaleToWidth * 1.2,
                  textAlign: properties.TextAlign,
                  fill: properties.Fill,
                  fontFamily: properties.FontFamily,
                  angle: properties.Angle || null,
                  originX: properties.OriginX,
                  originY: properties.OriginY,
                  selectable: i !== 1 ? false : true,
                  type: properties.type,
                });
                text.set({
                  scaleX: properties.ScaleToWidth / text.width,
                });
                fabricRef.current.add(text);
               fabricRef.current.renderAll();
              }
               
            });
            
          });
          setIsMany(true);
        } else if (layer.type === "multiplyUniversalNumber" && key === "NumberOne") {
          globalProperties?.NumberOne.forEach((properties) => {
            const font = new FontFaceObserver(properties.FontFamily);
            font.load().then(() => {
              for (let i = 1; i < globalProperties.numberOfMatches; i++) {
                const text = new fabric.IText("8", {
                  top:
                  globalProperties.orientation === "vertically"
                    ? properties.Top + globalProperties.Margin * (i - 1)
                    : properties.Top,
                left:
                  globalProperties.orientation === "horizontally"
                    ? properties.Left + globalProperties.Margin * (i - 1)
                    : properties.Left,
                  fontSize: properties.FontSize,
                  className: properties?.className,
                  index: i,
                  id: properties.type + i,
                  width: (properties.ScaleToWidth || properties.Width) * 1.2,
                  textAlign: properties.TextAlign,
                  fill: properties.Fill,
                  fontFamily: properties.FontFamily,
                  format: properties.format || null,
                  angle: properties.Angle || null,
                  originX: properties.OriginX,
                  originY: properties.OriginY,
                  selectable: i !== 1 ? false : true,
                  type: properties.type,
                });
                text.set({
                  scaleX: properties.ScaleToWidth / text.width,
                });
                fabricRef.current.add(text);
              }
              fabricRef.current.renderAll();
             
            });
          });
           setIsMany(true);
        }
      }
    }
  });
}

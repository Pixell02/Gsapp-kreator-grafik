import React from 'react'
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

const addMatchDay = (fabricRef, coords, weekData) => {
  weekData.forEach((dayData, dayIndex) => {
    if (dayData) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "text") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
    }

    let text = "";

    dayData.forEach((day) => {
      if (day) {
        text = text + day + "\n";
      }
    });
    
    const font = new FontFaceObserver(coords.dayOne.FontFamily);
    font.load().then(() => {
      const fabricText = new fabric.Textbox(text ? text : " ", {
        top: dayIndex < 4 ? coords.dayOne.Top : coords.dayOne.Top + coords.dayOne.MarginTop,
        left:
          dayIndex > 3
            ? (dayIndex - 4) * coords.dayOne.MarginLeft + coords.dayOne.Left + 190
            : dayIndex * coords.dayOne.MarginLeft + coords.dayOne.Left + 190,
        fill: coords.dayOne.Fill,
        selectable: false,
        originX: "center",
        originY: "top",
        className: "text",
        textAlign: coords.dayOne.TextAlign,
        width: coords.dayOne.Width,
        fontSize: coords.dayOne.FontSize,
        fontFamily: coords.dayOne.FontFamily,
        fontStyle: coords.dayOne.FontStyle ? coords.dayOne.FontStyle : "normal",
        breakWords: true
      });
      fabricText._textLines.forEach((lines, i) => {
        const width = fabricText.getLineWidth(i);

        while (width > coords.dayOne.ScaleToWidth - 50) {
          const fontSize = fabricText.get("fontSize");
          fabricText.set("fontSize", fontSize - 1);
          const newWidth = fabricText.getLineWidth(i);
          if (newWidth <= coords.dayOne.ScaleToWidth - 50) {
            fabricRef.current.add(fabricText);
           fabricRef.current.renderAll();
            break;
          }
         
        }
      });
      
      fabricRef.current.add(fabricText);
      fabricRef.current.renderAll();
    });
  });

}

export default addMatchDay

import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import findThemeOption from "../../../../SingleElements/functions/themeOption";

const useAddMultiplyImageAndText = (fabricRef, selectedMatch) => {
  const handleAddImage = (coords, image, properties) => {
    fabricRef.current._objects.forEach((image, i) => {
      if (fabricRef.current.item(i).className === coords.className + selectedMatch) {
        fabricRef.current.remove(fabricRef.current.item(i));
        fabricRef.current.renderAll();
      }
    });
    const img = new Image();
    img.src = image;

    img.onload = () => {
      fabric.Image.fromURL(img.src, function (img) {
        img.set({
          selectable: false,
          top: properties.orientation === "vertically" ? coords.Top + ((selectedMatch - 1) * properties.Margin) : coords.Top,
          left:
            properties.orientation === "horizontally" ? coords.Left + ((selectedMatch - 1) * properties.Margin) : coords.Left,
          originX: "center",
          originY: "center",
          className: coords.className + selectedMatch,
        });
        img.scaleToHeight(coords.ScaleToHeight);
        if (coords.ScaleToWidth) {
          if (img.width * img.scaleX > coords.ScaleToWidth) {
            img.scaleToWidth(coords.ScaleToWidth);
          }
        }
        fabricRef.current.add(img);
        fabricRef.current.renderAll();
      });
    };
  };
  const handleAddText = (coords, teamName, properties) => {
    console.log(coords)
    fabricRef.current._objects.forEach((image, i) => {
      if (fabricRef.current.item(i).className === coords?.className + selectedMatch) {
        fabricRef.current.remove(fabricRef.current.item(i));
        fabricRef.current.renderAll();
      }
    });
    const font = new FontFaceObserver(coords.FontFamily);
    font.load().then(() => {
      const text = new fabric.Text(teamName, {
        selectable: false,
        charSpacing: coords.CharSpacing ? coords.CharSpacing : 0,
        fontStyle: coords.FontStyle ? coords.FontStyle : "normal",
        originX: coords.OriginX,
        originY: coords.OriginY,
        top: properties.orientation === "vertically" ? coords.Top + ((selectedMatch - 1) * properties.Margin) : coords.Top,
        left: properties.orientation === "horizontally" ? coords.Left + ((selectedMatch - 1) * properties.Margin) : coords.Left,
        fill: coords.Fill,
        fontSize: coords.FontSize,
        fontFamily: coords.FontFamily,
        angle: coords.Angle || 0,
        className: coords?.className + selectedMatch,
      });
      if (text.width > coords.ScaleToWidth) {
        text.scaleToWidth(coords.ScaleToWidth);
      }
      
      if (coords.themeOption) {
        findThemeOption(coords, coords.themeOption, text);
      }
      fabricRef.current.add(text);
      fabricRef.current.renderAll();
    });
  };

  return { handleAddImage, handleAddText };
};

export default useAddMultiplyImageAndText;

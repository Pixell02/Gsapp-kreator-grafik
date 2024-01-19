import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import FontFaceObserver from "fontfaceobserver";
import { fabric } from "fabric";
import { useThemeContext } from "../context/ThemeContext";

const useTextboxLayer = (coords: DocumentData, fabricRef?: React.MutableRefObject<fabric.Canvas>) => {
  const [textValue, setTextValue] = useState<string>("");
  const [textboxObject, setTextboxObject] = useState<fabric.Textbox | null>(null);
  const { themeColor } = useThemeContext();
  useEffect(() => {
    if (textboxObject || !coords) return;
    const font = new FontFaceObserver(coords.FontFamily);
    if (!font) return;
    font.load().then(() => {
      const text = new fabric.Textbox("", {
        top: coords.Top,
        left: coords.Left,
        textAlign: coords.TextAlign,
        lineHeight: coords.LineHeight || 1,
        width: coords.ScaleToWidth,
        fontFamily: coords.FontFamily,
        fontSize: coords.FontSize,
        selectable: false,
        fill: coords.Fill,
        angle: coords.Angle || 0,
        originX: coords.OriginX,
        originY: coords.OriginY || "top",
      });
      fabricRef?.current.add(text);
      setTextboxObject(text);
      fabricRef?.current.renderAll();
    });
  }, [textboxObject, coords, fabricRef]);

  useEffect(() => {
    if (!textboxObject) return;
    textboxObject.set("text", textValue);
    fabricRef?.current.renderAll();
  }, [textValue, textboxObject]);

  useEffect(() => {
    const findThemeOption = (themeOption: DocumentData) => {
      const matchedTheme = themeOption.find(
        (theme: { label: string; color: string; Fill: string }) =>
          theme.color === themeColor?.label || theme.label === themeColor?.label
      );

      const selectedFill = matchedTheme ? matchedTheme.Fill : coords.Fill;

      textboxObject?.set({
        fill: selectedFill,
      });
      fabricRef?.current.renderAll();
    };
    if (themeColor && textboxObject && coords.themeOption) {
      findThemeOption(coords.themeOption);
    }
  }, [themeColor, textboxObject]);

  return { setTextValue, textboxObject, textValue };
};

export default useTextboxLayer;

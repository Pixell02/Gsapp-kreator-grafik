import { Text } from "fabric/fabric-impl";
import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { DocumentData } from "firebase/firestore";
import { useThemeContext } from "../../../../../../context/ThemeContext";
import { Properties } from "./useProperties";
import useFont from "../../../../../../hooks/useFont";

const useMultiplyTextLayer = (
  coords: DocumentData,
  i: number,
  properties: Properties | null,
  fabricRef?: React.MutableRefObject<fabric.Canvas>
) => {
  const [textValue, setTextValue] = useState<string>("");
  const [textObject, setTextObject] = useState<Text | null>(null);
  const { fontFace } = useFont(coords?.FontFamily);
  const { themeColor } = useThemeContext();
  useEffect(() => {
    if (!coords || !properties || !fabricRef?.current || !fontFace) return;
    if (textObject) return;
    fontFace.load().then((font) => {
      document.fonts.add(font);
      const text = new fabric.Text("", {
        charSpacing: coords.CharSpacing || 0,
        fontStyle: coords.FontStyle || "normal",
        originX: coords.OriginX,
        textAlign: coords.OriginX,
        originY: coords.OriginY,
        width: coords.ScaleToWidth,
        top: properties.orientation === "vertically" ? coords.Top + (i - 1) * properties.Margin : coords.Top,
        left: properties.orientation === "horizontally" ? coords.Left + (i - 1) * properties.Margin : coords.Left,
        fill: coords.Fill,
        fontSize: coords.FontSize,
        fontFamily: coords.FontFamily,
        angle: coords.Angle || 0,
      });
      fabricRef?.current.add(text);
      setTextObject(text);
      fabricRef?.current.renderAll();
    });
  }, [coords, properties, fabricRef, fontFace]);

  useEffect(() => {
    if (!textObject) return;

    textObject.set("text", textValue);

    if (textObject.width !== undefined && textObject.width > coords.ScaleToWidth) {
      textObject.scaleToWidth(coords.ScaleToWidth);
    }

    fabricRef?.current.renderAll();
  }, [textValue, textObject]);

  useEffect(() => {
    const findThemeOption = (themeOption: DocumentData) => {
      const matchedTheme = themeOption.find(
        (theme: { label: string; color: string; Fill: string }) =>
          theme.color === themeColor?.label || theme.label === themeColor?.label
      );

      const selectedFill = matchedTheme ? matchedTheme.Fill : coords.Fill;

      textObject?.set({
        fill: selectedFill,
      });
      fabricRef?.current.renderAll();
    };
    if (themeColor && textObject && coords.themeOption) {
      findThemeOption(coords.themeOption);
    }
  }, [themeColor, textObject]);

  return { setTextValue, textObject, textValue };
};

export default useMultiplyTextLayer;

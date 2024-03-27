import { Text } from "fabric/fabric-impl";
import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { DocumentData } from "firebase/firestore";
import { useThemeContext } from "../../../../../../context/ThemeContext";
import { Properties } from "./useProperties";
import useFont from "../../../../../../hooks/useFont";
import { Text as FabricText } from "../../../../../../../../types/globalPropertiesTypes";

const useMultiplyTextLayer = (
  coords: FabricText,
  i: number,
  properties: Properties,
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
        top:
          properties.orientation === "vertically"
            ? properties.rollAfter > 0
              ? (coords.Top as number) + ((i - 1) % properties.rollAfter) * properties.Margin
              : (coords.Top as number) + (i - 1) * properties.Margin
            : properties.rollAfter > 0 && i / properties.rollAfter > 1
            ? (coords.Top as number) +
              properties.MarginAfterRoll * Math.floor(properties.rollAfter > 0 ? (i - 1) / properties.rollAfter : i - 1)
            : (coords.Top as number),
        left:
          properties.orientation === "horizontally"
            ? properties.rollAfter > 0
              ? (coords.Left as number) + ((i - 1) % properties.rollAfter) * properties.Margin
              : (coords.Left as number) + (i - 1) * properties.Margin
            : properties.rollAfter > 0 && i / properties.rollAfter > 1
            ? (coords.Left as number) +
              properties.MarginAfterRoll * Math.floor(properties.rollAfter > 0 ? (i - 1) / properties.rollAfter : i - 1)
            : (coords.Left as number),
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

import { fabric } from "fabric";
import { useEffect, useState } from "react";
import { Text } from "fabric/fabric-impl";
import { useThemeContext } from "../../../../context/ThemeContext";
import { DocumentData } from "firebase/firestore";
import useFont from "../../../../hooks/useFont";

export type textCoordsProps = {
  Top: number;
  Left: number;
  FontSize: number;
  className: string;
  Fill: string;
  OriginX: string;
  OriginY: string;
  FontFamily: string;
  Angle?: number;
  CharSpacing?: number;
  ScaleToWidth: number;
  themeOption: DocumentData;
  FontStyle: "" | "normal" | "italic" | "oblique" | undefined;
};

const useTextLayer = (coords: textCoordsProps, fabricRef?: React.MutableRefObject<fabric.Canvas | null>) => {
  const [textValue, setTextValue] = useState<string>("");
  const { themeColor } = useThemeContext();
  const { fontFace } = useFont(coords?.FontFamily);
  const [textObject, setTextObject] = useState<Text | null>(null);
  useEffect(() => {
    if (!coords || !fabricRef?.current || !fontFace) return;
    if (textObject) return;
    fontFace.load().then((font) => {
      document.fonts.add(font);
      const text = new fabric.Text("", {
        selectable: false,
        top: coords.Top,
        left: coords.Left,
        fontSize: coords.FontSize,
        fill: coords.Fill,
        width: coords.ScaleToWidth,
        originX: coords.OriginX,
        originY: coords.OriginY,
        fontFamily: coords.FontFamily,
        angle: coords.Angle || 0,
        charSpacing: coords.CharSpacing || 0,
        fontStyle: coords.FontStyle || "normal",
      });
      fabricRef.current?.add(text);
      setTextObject(text);
      fabricRef.current?.renderAll();
    });
  }, [coords, fabricRef, fontFace]);

  useEffect(() => {
    if (!textObject) return;
    textObject.set("text", textValue || "");
    if (textObject.width && textObject.width >= coords.ScaleToWidth) {
      textObject.scaleToWidth(coords.ScaleToWidth);
      if (coords.Angle && coords?.Angle > 0) {
        textObject.scaleToHeight(coords.ScaleToWidth);
      }
    } else {
      textObject.set({ scaleX: 1, scaleY: 1 });
    }
    if (!fabricRef?.current) return;
    fabricRef.current.renderAll();
  }, [textObject, textValue, fabricRef, coords]);

  useEffect(() => {
    const findThemeOption = (themeOption: DocumentData) => {
      if (!fabricRef?.current) return;
      const matchedTheme = themeOption.find(
        (theme: { label: string; color: string; Fill: string }) =>
          theme.color === themeColor?.label || theme.label === themeColor?.label
      );

      const selectedFill = matchedTheme ? matchedTheme.Fill : coords.Fill;

      textObject?.set({
        fill: selectedFill,
      });
      fabricRef.current.renderAll();
    };
    if (themeColor && textObject && coords.themeOption && fabricRef?.current) {
      findThemeOption(coords.themeOption);
    }
  }, [themeColor, textObject]);

  return { textValue, setTextValue, textObject, setTextObject };
};

export default useTextLayer;

import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";
import { useEffect, useRef, useState } from "react";
import findThemeOption from "../functions/themeOption";
import useThemeContext from "../../../../hooks/useThemeContext";
import { Text } from "fabric/fabric-impl";

export type coordsProps = {
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
  themeOption?: boolean;
  FontStyle: "" | "normal" | "italic" | "oblique" | undefined;
};

const useTextLayer = (fabricRef: React.MutableRefObject<fabric.Canvas>, coords: coordsProps, name?: string) => {
  const [textValue, setTextValue] = useState("");
  const { themeColor } = useThemeContext();
  const textObjectRef = useRef<Text | null>(null);
  useEffect(() => {
    const font = new FontFaceObserver(coords.FontFamily);
    font.load().then(() => {
      const text = new fabric.Text("", {
        selectable: false,
        top: coords.Top,
        left: coords.Left,
        fontSize: coords.FontSize,
        fill: coords.Fill,
        originX: coords.OriginX,
        originY: coords.OriginY,
        fontFamily: coords.FontFamily,
        angle: coords.Angle || 0,
        charSpacing: coords.CharSpacing ? coords.CharSpacing : 0,
        fontStyle: coords.FontStyle ? coords.FontStyle : "normal",
      });
      if (coords.themeOption && themeColor) {
        findThemeOption(coords, themeColor, text);
      }
      fabricRef.current.add(text);
      textObjectRef.current = text;
      fabricRef.current.renderAll();
    });
  }, [themeColor, fabricRef, name, coords]);

  useEffect(() => {
    if (!textObjectRef.current) return;
    const text = textObjectRef.current;
    text.set("text", textValue);
    if (text.width && text?.width >= coords.ScaleToWidth) {
      text.scaleToWidth(coords.ScaleToWidth);
      if (coords.Angle && coords?.Angle > 0) {
        text.scaleToHeight(coords.ScaleToWidth);
      }
    }
    fabricRef.current.renderAll();
  }, [textObjectRef, textValue, fabricRef, coords]);

  return { textValue, setTextValue };
};

export default useTextLayer;

import { useEffect, useState } from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function useReserve(fabricRef, props) {
  const showReserve = (props) => {
    if (props.reserve) {
      let text = "";
      props.reserve.forEach((reserve) => {
        if (reserve) {
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "reserve") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          text = text + " " + reserve + `${props.coords.reserveOneFormatter}`;
        }
      });
      const font = new FontFaceObserver(props.coords.reserveOneFontFamily)
      font.load().then(() => {
        const reserveText = new fabric.Textbox(text, {
          selectable: false,
          className: "reserve",
          textAlign: props.coords.reserveOneTextAlign,
          width: props.coords.reserveOneWidth,
          top: props.coords.reserveOneTop,
          left: props.coords.reserveOneLeft,
          originX: props.coords.reserveOneOriginX,
          originY: props.coords.reserveOneOriginY,
          fontFamily: props.coords.reserveOneFontFamily,
          fontSize: props.coords.reserveOneFontSize,
          fill: props.coords.reserveOneFill,
      })
      if (props.themeOption) {
        if (
          props.themeOption.label.split("-")[0] === "biało" ||
          props.themeOption.label.split("-")[0] === "żółto" ||
          props.themeOption.label === "biały"
        ) {
          reserveText.set({
            fill: "black",
          });
        }
        if (props.id.theme === "motyw 2" && props.themeOption.label === "żółto-czarny") {
          reserveText.set({
            fill: "white",
          });
        }
        if (props.id.theme === "motyw 3" && props.themeOption.label === "żółto-czarny") {
          reserveText.set({
            fill: "white",
          });
        }
        if (
          props.id.theme === "motyw 3" &&
          props.themeOption.label === "biało-czerwono-niebiesko-zielony"
        ) {
          reserveText.set({
            fill: "white",
          });
        }
        if (
          props.id.theme === "motyw 3" &&
          props.themeOption.label === "biało-niebieski"
        ) {
          reserveText.set({
            fill: "white",
          });
        }
        if (
          props.id.theme === "motyw 5" &&
          props.themeOption.label === "biało-niebieski"
        ) {
          reserveText.set({ fill: "white" });
        }
        if (props.id.theme === "motyw 5" && props.themeOption.label === "żółto-czarny") {
          reserveText.set({ fill: "white" });
        }
      }
      fabricRef.current.add(reserveText);
      })
    }
  };

  return {showReserve};
}

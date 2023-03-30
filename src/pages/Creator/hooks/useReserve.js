import { useEffect, useState } from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function useReserve(fabricRef, props) {
  const showReserve = (props) => {
    if (props.reserve && props.coords.reserveOne) {
      let text = "";
      props.reserve.forEach((reserve) => {
        if (reserve) {
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "reserve") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });

          if (props.coords.playerOne.format === "NumDotSurName") {
            reserve = reserve.split(".")[0] + "." + reserve.split(".")[2];
          } else if (props.coords.playerOne.format === "NumSurName") {
           reserve =reserve.split(".")[0] + "." +reserve.split(".")[2];
          } else if (props.coords.playerOne.format === "dotted") {
            reserve = reserve.split(".")[0] + "." + reserve.split(".")[1][0] + "." + reserve.split(".")[2]; 
          } else if (props.coords.playerOne.format === "oneDot") {
            reserve = reserve.split(".")[0] + "." + reserve.split(".")[1][0] + "." + reserve.split(".")[2];
          } else {
            reserve = reserve.split(".")[2]
          }

            text = text + " " + reserve + `${props.coords.reserveOne.Formatter}`;
          
        }
      });
      if (props.coords.playerOne.textType === "upper") {
        text = text.toUpperCase();
      }
      const font = new FontFaceObserver(props.coords.reserveOne.FontFamily)
      font.load().then(() => {
        const reserveText = new fabric.Textbox(text, {
          selectable: false,
          className: "reserve",
          textAlign: props.coords.reserveOne.TextAlign,
          width: props.coords.reserveOne.ScaleToWidth,
          top: props.coords.reserveOne.Top,
          left: props.coords.reserveOne.Left,
          originX: props.coords.reserveOne.OriginX,
          originY: props.coords.reserveOne.OriginY,
          fontFamily: props.coords.reserveOne.FontFamily,
          fontSize: props.coords.reserveOne.FontSize,
          fill: props.coords.reserveOne.Fill,
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
        fabricRef.current.renderAll();
      })
    }
  };

  return {showReserve};
}

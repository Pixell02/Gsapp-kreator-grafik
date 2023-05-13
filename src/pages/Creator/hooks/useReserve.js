import { useEffect, useState } from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function useReserve(fabricRef, props) {
  const [fontSize, setFontSize] = useState();
  const showReserve = (props) => {
    if (props.reserve && props.coords.reserveOne) {
      let text = "";
      const innerText = new fabric.Text("");
      props.reserve.forEach((reserve) => {
        if (reserve) {
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "reserve") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          if (props.young) {
            props.young.forEach((young, i) => {
              if (young === reserve) {
                reserve += " (m)"
              }
            })
          }
          if (props.goalKeeper) {
            props.goalKeeper.forEach((goalKeeper, i) => {
              if (goalKeeper == reserve) {
                reserve += " (br)"
              }
            })
          }
           if (props.capitan === reserve) {
            if (props.poster !== "3be4e46594d747bebe89a8145edf8edc"){
            reserve += "(c)";
            } else {
              reserve += "(k)";
            }
          }
          if (props.coords.playerOne.format === "NumDotSurName") {
            reserve = reserve.split(".")[0] + "." + reserve.split(".")[2];
          } else if (props.coords.playerOne.format === "NumSurName") {
           reserve =reserve.split(".")[0] + " " +reserve.split(".")[2];
          } else if (props.coords.playerOne.format === "dotted") {
            reserve = reserve.split(".")[0] + "." + reserve.split(".")[1][0] + "." + reserve.split(".")[2]; 
          } else if (props.coords.playerOne.format === "oneDot") {
            reserve = reserve.split(".")[0] + "." + reserve.split(".")[1][0] + "." + reserve.split(".")[2];
          } else {
            reserve = reserve.split(".")[2]
          }
          let formatReserve = reserve;
          innerText.set("text", formatReserve + `${props.coords.reserveOne.Formatter}`);

            text = text + " " + formatReserve + ` ${props.coords.reserveOne.Formatter}`;
          
        }
      });
      if (props.coords.playerOne.textType === "upper") {
        text = text.toUpperCase();
      }
      console.log(innerText);
      const font = new FontFaceObserver(props.coords.reserveOne.FontFamily)
      font.load().then(() => {
        const reserveText = new fabric.Textbox(text, {
          // selectable: false,
          className: "reserve",
          textAlign: props.coords.reserveOne.TextAlign,
          width: props.coords.reserveOne.ScaleToWidth * 1.1,
          top: props.coords.reserveOne.Top,
          left: props.coords.reserveOne.Left,
          originX: props.coords.reserveOne.OriginX,
          originY: props.coords.reserveOne.OriginY,
          fontFamily: props.coords.reserveOne.FontFamily,
          fontSize: props.coords.reserveOne.FontSize,
          fill: props.coords.reserveOne.Fill,
        })
        
        console.log(reserveText)
        if (reserveText.width > props.coords.reserveOne.ScaleToWidth) {
          reserveText.scaleToWidth(props.coords.reserveOne.ScaleToWidth)
        }
        if (props.coords.reserveOne.ScaleToHeight) {
          if (reserveText.height > props.coords.reserveOne.ScaleToHeight) {
            // reserveText.scaleToHeight(props.coords.reserveOne.ScaleToHeight);
            reserveText.set({
              fontSize: props.coords.reserveOne.FontSize - 4
            })
            if (reserveText.height > props.coords.reserveOne.ScaleToHeight) {
              reserveText.set({
                width: props.coords.reserveOne.ScaleToWidth,
                fontSize: props.coords.reserveOne.FontSize - 8
              })
            }
          }
        }
       
        
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

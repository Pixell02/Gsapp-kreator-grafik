import React from "react";
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function usePlayerName(fabricRef, props) {
  const squadPlayer = (props) => {
    if (props.players && props.coords.playerOne) {
      let text = "";
      props.players.forEach((player) => {
        if (player) {
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "player") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          let formatPlayer;

          if (props.coords.playerOne.format === "NumDotSurName") {
            formatPlayer = player.split(".")[0] + "." + player.split(".")[2];
          } else if (props.coords.playerOne.format === "NumSurName") {
            formatPlayer = player.split(".")[0] + " " + player.split(".")[2];
          } else if (props.coords.playerOne.format === "dotted") {
            formatPlayer = player.split(".")[0] + "." + player.split(".")[1][0] + "." + player.split(".")[2];
          } else if (props.coords.playerOne.format === "oneDot") {
            formatPlayer = player.split(".")[0] + " " + player.split(".")[1][0] + "." + player.split(".")[2];
          } else {
            formatPlayer = player.split(".")[2];
          }
          if (props.young) {
            props.young.forEach((young, i) => {
              if (young === player) {
                formatPlayer += " (m)"
              }
            })
          }
          
          if (props.goalKeeper) {
            props.goalKeeper.forEach((goalKeeper, i) => {
              if (goalKeeper === player) {
                formatPlayer += " (br)"
              }
            })
          } if (props.capitan === player) {
            if (props.poster !== "3be4e46594d747bebe89a8145edf8edc"){
            formatPlayer += " (c)";
            } else {
              formatPlayer += " (k)";
            }
          } else {
            formatPlayer = formatPlayer;
          }
          if (props.coords.playerOne.textType === "upper") {
            formatPlayer = formatPlayer.toUpperCase();
          }
          
          text = text + " " + formatPlayer + "\n";
          
        }
      });
      const font = new FontFaceObserver(props.coords.playerOne.FontFamily);
      font.load().then(() => {
        const showPlayer = new fabric.Textbox(text, {
          selectable: false,
          top: props.coords.playerOne.Top,
          left: props.coords.playerOne.Left,
          lineHeight: props.coords.playerOne.LineHeight,
          textAlign: props.coords.playerOne.TextAlign,
          originX: props.coords.playerOne.OriginX,
          width: props.coords.playerOne.ScaleToWidth * 1.5,
          fontSize: props.coords.playerOne.FontSize,
          fill: props.coords.playerOne.Fill,
          className: "player",
          fontFamily: props.coords.playerOne.FontFamily,
          splitByGrapheme: true,
        });
        if (props.coords.playerOne.CharSpacing) {
          showPlayer.set({
            charSpacing: props.coords.playerOne.CharSpacing,
          });
        }
        if (props.themeOption) {
          if (
            props.themeOption.label.split("-")[0] === "biało" ||
            props.themeOption.label.split("-")[0] === "żółto" ||
            props.themeOption.label === "biały"
          ) {
            showPlayer.set({
              fill: "black",
            });
          }
          if (props.id.theme === "motyw 2" && props.themeOption.label === "żółto-czarny") {
            showPlayer.set({
              fill: "white",
            });
          }
          if (props.id.theme === "motyw 3" && props.themeOption.label === "czarno-biały") {
            showPlayer.set({
              fill: "black",
            });
          }
          if (props.id.theme === "motyw 3" && props.themeOption.label === "zielony") {
            showPlayer.set({
              fill: "black",
            });
          }
          if (props.id.theme === "motyw 5" && props.themeOption.label === "biało-niebieski") {
            showPlayer.set({ fill: "white" });
          }
          if (props.id.theme === "motyw 5" && props.themeOption.label === "żółto-czarny") {
            showPlayer.set({ fill: "white" });
          }
        }

        showPlayer._textLines.forEach((lines, i) => {
          const width = showPlayer.getLineWidth(i);
          if (width >= props.coords.playerOne.ScaleToWidth) {
            showPlayer.scaleToWidth(props.coords.playerOne.ScaleToWidth);
          }
        });

        fabricRef.current.add(showPlayer);

        fabricRef.current.renderAll();
      });
    }
  };
  return { squadPlayer };
}

import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export const yourResult = (fabricRef,props) => {
    if (props.yourTeamResult) {
      if (props.radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourTeamResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const font = new FontFaceObserver(
          props.coords.yourTeamResult.FontFamily
        );
        font.load().then(() => {
          const result = new fabric.Text(props.yourTeamResult, {
            top: props.coords.yourTeamResult.Top,
            left: props.coords.yourTeamResult.Left,
            fontFamily: props.coords.yourTeamResult.FontFamily,
            fontSize: props.coords.yourTeamResult.FontSize,
            selectable: false,
            fill: props.coords.yourTeamResult.Fill,
            className: "yourTeamResult",
            originX: props.coords.yourTeamResult.OriginX,
            originY: props.coords.yourTeamResult.OriginY,
          });
          
          if (result.width > props.coords.yourTeamResult.ScaleToWidth) {
            result.scaleToWidth(props.coords.yourTeamResult.ScaleToWidth);
          }
          if (props.themeOption) {
            if (
              props.themeOption.label.split("-")[0] === "biało" ||
              props.themeOption.label.split("-")[0] === "żółto" ||
              props.themeOption.label === "biały"
            ) {
              result.set({
                fill: "black",
              });
            }
            if (
              props.poster === "PmoRESwg91LxFAGFObbZ" ||
              props.themeOption.label === "biało-czerwono-niebiesko-zielony"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              props.id.theme === "motyw 3" &&
              props.themeOption.label === "biało-niebieski"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              props.id.theme === "motyw 3" &&
              props.themeOption.label === "żółto-czarny"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              props.id.theme === "motyw 5" &&
              (props.themeOption.label === "żółto-czarny" ||
                props.themeOption.label === "biało-niebieski")
            ) {
              result.set({
                fill: "white",
              });
            }
          }

          fabricRef.current.add(result);
          fabricRef.current.renderAll();
        });
      } else if (props.radioChecked === "radio2") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourTeamResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const font = new FontFaceObserver(
          props.coords.yourOpponentResult.FontFamily
        );
        font.load().then(() => {
          const result = new fabric.Text(props.yourTeamResult, {
            top: props.coords.yourOpponentResult.Top,
            left: props.coords.yourOpponentResult.Left,
            fontFamily: props.coords.yourOpponentResult.FontFamily,
            fontSize: props.coords.yourOpponentResult.FontSize,
            selectable: false,
            fill: props.coords.yourOpponentResult.Fill,
            className: "yourTeamResult",
            originX: props.coords.yourOpponentResult.OriginX,
            originY: props.coords.yourOpponentResult.OriginY,
          });
          // result.scaleToHeight(props.coords.yourOpponentResult.ScaleToHeight);
          if (result.width > props.coords.yourOpponentResult.ScaleToWidth) {
            result.scaleToWidth(props.coords.yourOpponentResult.ScaleToWidth);
          }
          if (props.themeOption) {
            if (
              props.themeOption.label.split("-")[0] === "biało" ||
              props.themeOption.label.split("-")[0] === "żółto" ||
              props.themeOption.label === "biały"
            ) {
              result.set({
                fill: "black",
              });
            }
            if (
              props.poster === "PmoRESwg91LxFAGFObbZ" ||
              props.themeOption.label === "biało-czerwono-niebiesko-zielony"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              props.id.theme === "motyw 3" &&
              props.themeOption.label === "biało-niebieski"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              props.id.theme === "motyw 3" &&
              props.themeOption.label === "żółto-czarny"
            ) {
              result.set({
                fill: "white",
              });
            }
            if (
              props.id.theme === "motyw 5" &&
              (props.themeOption.label === "żółto-czarny" ||
                props.themeOption.label === "biało-niebieski")
            ) {
              result.set({
                fill: "white",
              });
            }
          }
          fabricRef.current.add(result);
          fabricRef.current.renderAll();
        });
      }
    }
  };
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
          props.coords.yourTeamResultFontFamily
        );
        font.load().then(() => {
          const result = new fabric.Text(props.yourTeamResult, {
            top: props.coords.yourTeamResultTop,
            left: props.coords.yourTeamResultLeft,
            width: props.coords.yourTeamResultWidth,
            fontFamily: props.coords.yourTeamResultFontFamily,
            selectable: false,
            fill: props.coords.yourTeamResultFill,
            className: "yourTeamResult",
            originX: props.coords.yourTeamResultOriginX,
            originY: props.coords.yourTeamResultOriginY,
          });
          result.scaleToHeight(props.coords.yourTeamResultScaleToHeight);
          if (result.width > props.coords.yourTeamResultWidth) {
            result.scaleToWidth(props.coords.yourTeamResultScaleToWidth);
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
        });
      } else if (props.radioChecked === "radio2") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourTeamResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const font = new FontFaceObserver(
          props.coords.yourOpponentResultFontFamily
        );
        font.load().then(() => {
          const result = new fabric.Text(props.yourTeamResult, {
            top: props.coords.yourOpponentResultTop,
            width: props.coords.yourOpponentResult,
            left: props.coords.yourOpponentResultLeft,
            fontFamily: props.coords.yourOpponentResultFontFamily,
            selectable: false,
            fill: props.coords.yourOpponentResultFill,
            className: "yourTeamResult",
            originX: props.coords.yourOpponentResultOriginX,
            originY: props.coords.yourOpponentResultOriginY,
          });
          result.scaleToHeight(props.coords.yourOpponentResultScaleToHeight);
          if (result.width > props.coords.yourOpponentResultWidth) {
            result.scaleToWidth(props.coords.yourOpponentResultScaleToWidth);
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
        });
      }
    }
  };
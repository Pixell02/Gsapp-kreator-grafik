import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export const opponentResult = (fabricRef, props) => {
  
    if (props.yourOpponentResult) {
      if (props.radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "yourOpponentResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
            fabricRef.current.renderAll();
          }
        });
        const font = new FontFaceObserver(
          props.coords.yourOpponentResult.FontFamily
        );
        font.load().then(() => {
          const result = new fabric.Text(props.yourOpponentResult, {
            top: props.coords.yourOpponentResult.Top,
            left: props.coords.yourOpponentResult.Left,
            fontFamily: props.coords.yourOpponentResult.FontFamily,
            selectable: false,
            fill: props.coords.yourOpponentResult.Fill,
            fontSize: props.coords.yourTeamResult.FontSize,
            className: "yourOpponentResult",
            originX: props.coords.yourOpponentResult.OriginX,
            originY: props.coords.yourOpponentResult.OriginY,
          });

          // result.scaleToHeight(props.coords.yourOpponentResult.ScaleToHeight);
          if (result.width >= props.coords.yourOpponentResult.ScaleToWidth) {
            result.scaleToWidth(props.coords.yourOpponentResult.ScaleToWidth);
          }
          
          if (props.coords.yourOpponentResult.themeOption) {
            props.coords.yourOpponentResult.themeOption.forEach((theme) => {
              if (theme.color === props.themeOption.label) {
                result.set({
                  fill: theme.Fill
                })
              }
            })
          }

          fabricRef.current.add(result);
          fabricRef.current.renderAll();
        });
      } else {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "yourOpponentResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const result = new fabric.Text(props.yourOpponentResult, {
          top: props.coords.yourTeamResult.Top,
          left: props.coords.yourTeamResult.Left,
          fontFamily: props.coords.yourTeamResult.FontFamily,
          fontSize: props.coords.yourTeamResult.FontSize,
          selectable: false,
          fill: props.coords.yourTeamResult.Fill,
          className: "yourOpponentResult",
          originX: props.coords.yourTeamResult.OriginX,
          originY: props.coords.yourTeamResult.OriginY,
        });
        // result.scaleToHeight(props.coords.yourTeamResult.ScaleToHeight);
        if (result.width >= props.coords.yourTeamResult.ScaleToWidth) {
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
      }
    }
  };
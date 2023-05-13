// import "../../../fonts/Russo_One.ttf";
// import "../../../fonts/Poppins-BoldItalic.ttf";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import useFabricCanvas from "./hooks/useFabricCanvas.js";
import FontFaceObserver from "fontfaceobserver";
import { useParams } from "react-router-dom";
import useTeamName from "./hooks/useTeamName.js";
import useOpponentName from "./hooks/useOpponentName.js";

export default function GoalPoster(props) {
  
  const { poster } = useParams();
  const fabricRef = useRef();
  const {initFabric} = useFabricCanvas(fabricRef, props);
  const [yourTeamLogo, setYourTeamLogo] = useState(props.yourLogo);
  const [yourTeamImg, setYourTeamImg] = useState(props.yourTeamImage);
  const { teamLogo, secondTeamLogo, teamName } = useTeamName(fabricRef, props);
  const {opponentsName, opponentLogo} = useOpponentName(fabricRef ,props);
  const [width, setWidth] = useState()
  const [height, setHeight] = useState();

  useEffect(() => {
    const img = new Image();
    img.src = props.posterBackGround;
    setWidth(img.width)
    setHeight(img.height);
  },[props.posterBackGround])
 
 
  
  
  useEffect(() => {
    initFabric();
  }, [props.posterBackGround]);


  useEffect(() => {
    
  opponentLogo(props);
},[props.radioChecked, props.posterBackGround, props.opponent])
  
  useEffect(() => {
    teamLogo();
  }, [props.radioChecked, props.posterBackGround, props.yourTeamImage]);

  const yourPlayerFullName = () => {
    let player;
    if (props.yourPlayer) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourPlayer") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (
        poster === "fbdiShvAmFm1QbivOwMU" ||
        poster === "oRVBJEM5RcjZ0J1dj7C7" ||
        poster === "rtZUgjjd4i74jHW0mRPs"
      ) {
        const playerSurName = props.yourPlayer.split(" ")[1];
        player = props.yourPlayer[0] + "." + playerSurName;
        
      }
        
      const font = new FontFaceObserver(props.coords.player.FontFamily);
      font.load().then(() => {
        if(poster !== "lZP9mhRklsifxKLUvzTd"){
          player = props.yourPlayer.toUpperCase();
        }

        const playerName = new fabric.Text(player ? player : props.yourPlayer, {
          left: props.coords.player.Left,
          top: props.coords.player.Top,
          fill: props.coords.player.Fill,
          originX: props.coords.player.OriginX,
          originY: props.coords.player.OriginY,
          className: "yourPlayer",
          selectable: false,
          fontFamily: props.coords.player.FontFamily,
        });
        playerName.scaleToHeight(props.coords.player.ScaleToHeight);
        if (playerName.width > props.coords.player.ScaleToWidth) {
          playerName.scaleToWidth(props.coords.player.ScaleToWidth);
        }
        console.log(playerName)
        if (
          poster === "lZP9mhRklsifxKLUvzTd" &&
          props.themeOption.label.split("-")[0] === "żółto"
        ) {
          playerName.set({
            fill: "black",
          });
        } else {
          playerName.set({
            fill: "white",
          });
        }
        if (props.id.theme === "motyw 4" && props.themeOption.label === "czarno-biały") {
          playerName.set({
            fill: "black",
          });
        }
        if (props.id.theme === "motyw 4" && props.themeOption.label === "zielony") {
          playerName.set({
            fill: "black",
          });
        }
        if (props.id.theme === "motyw 4" && props.themeOption.label === "niebieski") {
          playerName.set({
            fill: "black",
          });
        }
        console.log(playerName);
        fabricRef.current.add(playerName);
      });
    }
  };
  const yourResult = () => {
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
            selectable: false,
            fill: props.coords.yourTeamResult.Fill,
            fontSize: props.coords.yourTeamResult.FontSize,
            className: "yourTeamResult",
            originX: props.coords.yourTeamResult.OriginX,
            originY: props.coords.yourTeamResult.OriginY,
          });
          
          if(result.width > props.coords.yourOpponentResult.ScaleToWidth) {
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
              poster === "PmoRESwg91LxFAGFObbZ" ||
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
              (props.themeOption.label === "żółto-czarny" || props.themeOption.label === "biało-niebieski")
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
          
          if(result.width > props.coords.yourOpponentResult.ScaleToWidth) {
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
              poster === "PmoRESwg91LxFAGFObbZ" ||
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
              (props.themeOption.label === "żółto-czarny" || props.themeOption.label === "biało-niebieski")
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
  const opponentResult = () => {
    if (props.yourOpponentResult) {
      if (props.radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourOpponentResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const font = new FontFaceObserver(
          props.coords.yourOpponentResult.FontFamily
        );
        font.load().then(() => {
          const result = new fabric.Text(props.yourOpponentResult, {
            top:props.coords.yourOpponentResult.Top,
            left: props.coords.yourOpponentResult.Left,
            fontFamily: props.coords.yourOpponentResult.FontFamily,
            fontSize: props.coords.yourOpponentResult.FontSize,
            selectable: false,
            fill: props.coords.yourOpponentResult.Fill,
            className: "yourOpponentResult",
            originX: props.coords.yourOpponentResult.OriginX,
            originY: props.coords.yourOpponentResult.OriginY,
          });

         
          if(result.width > props.coords.yourOpponentResult.ScaleToWidth) {
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
              poster === "PmoRESwg91LxFAGFObbZ" ||
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
              (props.themeOption.label === "żółto-czarny" || props.themeOption.label === "biało-niebieski")
            ) {
              result.set({
                fill: "white",
              });
            }
          }

          fabricRef.current.add(result);
        });
      } else {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourOpponentResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const result = new fabric.Text(props.yourOpponentResult, {
          top: props.coords.yourTeamResult.Top,
          left: props.coords.yourTeamResult.Left,
          fontFamily: props.coords.yourTeamResult.FontFamily,
          fontSize: props.coords.yourTeamResult.fontSize,
          selectable: false,
          fill: props.coords.yourTeamResult.Fill,
          className: "yourOpponentResult",
          originX: props.coords.yourTeamResult.OriginX,
          originY: props.coords.yourTeamResult.OriginY,
        });
        
        if(result.width > props.coords.yourTeamResult.ScaleToWidth) {
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
            poster === "PmoRESwg91LxFAGFObbZ" ||
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
            (props.themeOption.label === "żółto-czarny" || props.themeOption.label === "biało-niebieski")
          ) {
            result.set({
              fill: "white",
            });
          }
        }

        fabricRef.current.add(result);
      }
    }
  };
  useEffect(() => {
    opponentResult();
  }, [props.yourOpponentResult, props.posterBackGround, props.radioChecked]);

  useEffect(() => {
    yourResult();
  }, [props.yourTeamResult, props.posterBackGround, props.radioChecked]);

  useEffect(() => {
    yourPlayerFullName();
  }, [props.yourPlayer, props.posterBackGround]);

  return <canvas id="canvas" ref={fabricRef}></canvas>;
}

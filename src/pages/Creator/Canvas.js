
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";


import { useParams } from "react-router-dom";
import useFabricCanvas from "./hooks/useFabricCanvas.js";
import FontFaceObserver from "fontfaceobserver";
import useTeamName from "./hooks/useTeamName.js";
import useText from "./hooks/useText.js";
import useOpponentName from "./hooks/useOpponentName.js";
import { opponentResult } from "./hooks/opponentResult.js";
import { yourResult } from "./hooks/yourTeamResult.js";
import opponentGoals from "./hooks/opponentGoals.js";

function MatchPoster(props) {
  
  const { poster } = useParams();
  
  const [yourTeamLogo, setYourTeamLogo] = useState(props.yourLogo);
  const fabricRef = useRef();
  const {initFabric} = useFabricCanvas(fabricRef, props);
  const {teamLogo, secondTeamLogo, teamName} = useTeamName(fabricRef, props);
  const {opponentsName, opponentLogo} = useOpponentName(fabricRef);
  const {typePlace, yourKolejka, typeDate, yourLeague} = useText(fabricRef, props)
  useEffect(() => {
    opponentGoals(fabricRef, props);
  },[props.opponentGoal, props.opponentGoalMinute, props.radioChecked, props.themeOption])

  const yourPlayerGoalOne = () => {
    if (props.yourPlayerOneGoal) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourPlayerGoalOne") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.radioChecked === "radio1") {
        const font = new FontFaceObserver(
          props.coords.yourPlayerGoalFontFamily
        );
        font.load().then(() => {
          const yourPlayerGoal = new fabric.Text(
            props.yourPlayerOneGoal.toUpperCase(),
            {
              top: props.coords.yourPlayerOneGoalTop,
              left: props.coords.yourPlayerOneGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "yourPlayerGoalOne",
              originX: props.coords.yourPlayerGoalOriginX,
              originY: props.coords.yourPlayerGoalOriginY,
            }
          );
          if (props.coords.yourPlayerGoalWidth) {
            yourPlayerGoal.set({
              width: props.coords.yourPlayerGoalWidth,
            });
          }
          if (props.coords.yourPlayerGoalScaleToWidth) {
            if (
              yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
            ) {
              yourPlayerGoal.scaleToWidth(
                props.coords.yourPlayerGoalScaleToWidth
              );
            }
          }
          fabricRef.current.add(yourPlayerGoal);
        });
      } else {
        if (props.coords.opponentPlayerOneGoalTop) {
          const font = new FontFaceObserver(
            props.coords.yourPlayerGoalFontFamily
          );
          font.load().then(() => {
            const yourPlayerGoal = new fabric.Text(
              props.yourPlayerOneGoal.toUpperCase(),
              {
                top: props.coords.opponentPlayerOneGoalTop,
                left: props.coords.opponentPlayerOneGoalLeft,
                fontFamily: props.coords.yourPlayerGoalFontFamily,
                fontSize: props.coords.yourPlayerGoalFontSize,
                selectable: false,
                fill: props.coords.yourPlayerGoalFill,
                className: "yourPlayerGoalOne",
                originX: props.coords.opponentPlayerGoalOriginX,
                originY: props.coords.opponentPlayerGoalOriginY,
              }
            );
            if (props.coords.yourPlayerGoalWidth) {
              yourPlayerGoal.set({
                width: props.coords.yourPlayerGoalWidth,
              });
            }
            if (props.coords.yourPlayerGoalScaleToWidth) {
              if (
                yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
              ) {
                yourPlayerGoal.scaleToWidth(
                  props.coords.yourPlayerGoalScaleToWidth
                );
              }
            }
            fabricRef.current.add(yourPlayerGoal);
          });
        } else {
          const font = new FontFaceObserver(
            props.coords.yourPlayerGoalFontFamily
          );
          font.load().then(() => {
            const yourPlayerGoal = new fabric.Text(
              props.yourPlayerOneGoal.toUpperCase(),
              {
                top: props.coords.yourPlayerOneGoalTop,
                left: props.coords.yourPlayerOneGoalLeft,
                fontFamily: props.coords.yourPlayerGoalFontFamily,
                fontSize: props.coords.yourPlayerGoalFontSize,
                selectable: false,
                fill: props.coords.yourPlayerGoalFill,
                className: "yourPlayerGoalOne",
                originX: props.coords.yourPlayerGoalOriginX,
                originY: props.coords.yourPlayerGoalOriginY,
              }
            );
            if (props.coords.yourPlayerGoalWidth) {
              yourPlayerGoal.set({
                width: props.coords.yourPlayerGoalWidth,
              });
            }
            if (props.coords.yourPlayerGoalScaleToWidth) {
              if (
                yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
              ) {
                yourPlayerGoal.scaleToWidth(
                  props.coords.yourPlayerGoalScaleToWidth
                );
              }
            }
            fabricRef.current.add(yourPlayerGoal);
          });
        }
      }
    }
  };

  yourPlayerGoalOne();

  const yourPlayerGoalTwo = () => {
    if (props.yourPlayerTwoGoal) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourPlayerGoalTwo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.radioChecked === "radio1") {
        const font = new FontFaceObserver(
          props.coords.yourPlayerGoalFontFamily
        );
        font.load().then(() => {
          const yourPlayerGoal = new fabric.Text(
            props.yourPlayerTwoGoal.toUpperCase(),
            {
              top: props.coords.yourPlayerTwoGoalTop,
              left: props.coords.yourPlayerTwoGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "yourPlayerGoalTwo",
              originX: props.coords.yourPlayerGoalOriginX,
              originY: props.coords.yourPlayerGoalOriginY,
            }
          );
          if (props.coords.yourPlayerGoalWidth) {
            yourPlayerGoal.set({
              width: props.coords.yourPlayerGoalWidth,
            });
          }
          if (props.coords.yourPlayerGoalScaleToWidth) {
            if (
              yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
            ) {
              yourPlayerGoal.scaleToWidth(
                props.coords.yourPlayerGoalScaleToWidth
              );
            }
          }
          fabricRef.current.add(yourPlayerGoal);
        });
      } else {
        if (props.coords.opponentPlayerOneGoalTop) {
          const font = new FontFaceObserver(
            props.coords.yourPlayerGoalFontFamily
          );
          font.load().then(() => {
            const yourPlayerGoal = new fabric.Text(
              props.yourPlayerOneGoal.toUpperCase(),
              {
                top: props.coords.opponentPlayerTwoGoalTop,
                left: props.coords.opponentPlayerTwoGoalLeft,
                fontFamily: props.coords.yourPlayerGoalFontFamily,
                fontSize: props.coords.yourPlayerGoalFontSize,
                selectable: false,
                fill: props.coords.yourPlayerGoalFill,
                className: "yourPlayerGoalTwo",
                originX: props.coords.opponentPlayerGoalOriginX,
                originY: props.coords.opponentPlayerGoalOriginY,
              }
            );
            if (props.coords.yourPlayerGoalWidth) {
              yourPlayerGoal.set({
                width: props.coords.yourPlayerGoalWidth,
              });
            }
            if (props.coords.yourPlayerGoalScaleToWidth) {
              if (
                yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
              ) {
                yourPlayerGoal.scaleToWidth(
                  props.coords.yourPlayerGoalScaleToWidth
                );
              }
            }
            fabricRef.current.add(yourPlayerGoal);
          });
        } else {
          const font = new FontFaceObserver(
            props.coords.yourPlayerGoalFontFamily
          );
          font.load().then(() => {
            const yourPlayerGoal = new fabric.Text(
              props.yourPlayerTwoGoal.toUpperCase(),
              {
                top: props.coords.yourPlayerTwoGoalTop,
                left: props.coords.yourPlayerTwoGoalLeft,
                fontFamily: props.coords.yourPlayerGoalFontFamily,
                fontSize: props.coords.yourPlayerGoalFontSize,
                selectable: false,
                fill: props.coords.yourPlayerGoalFill,
                className: "yourPlayerGoalTwo",
                originX: props.coords.yourPlayerGoalOriginX,
                originY: props.coords.yourPlayerGoalOriginY,
              }
            );
            if (props.coords.yourPlayerGoalWidth) {
              yourPlayerGoal.set({
                width: props.coords.yourPlayerGoalWidth,
              });
            }
            if (props.coords.yourPlayerGoalScaleToWidth) {
              if (
                yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
              ) {
                yourPlayerGoal.scaleToWidth(
                  props.coords.yourPlayerGoalScaleToWidth
                );
              }
            }
            fabricRef.current.add(yourPlayerGoal);
          });
        }
      }
    }
  };

  yourPlayerGoalTwo();

  const yourPlayerGoalThree = () => {
    if (props.yourPlayerThreeGoal) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourPlayerGoalThree") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.radioChecked === "radio1") {
        const font = new FontFaceObserver(
          props.coords.yourPlayerGoalFontFamily
        );
        font.load().then(() => {
          const yourPlayerGoal = new fabric.Text(
            props.yourPlayerThreeGoal.toUpperCase(),
            {
              top: props.coords.yourPlayerThreeGoalTop,
              left: props.coords.yourPlayerThreeGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "yourPlayerGoalThree",
              originX: props.coords.yourPlayerGoalOriginX,
              originY: props.coords.yourPlayerGoalOriginY,
            }
          );
          if (props.coords.yourPlayerGoalWidth) {
            yourPlayerGoal.set({
              width: props.coords.yourPlayerGoalWidth,
            });
          }
          if (props.coords.yourPlayerGoalScaleToWidth) {
            if (
              yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
            ) {
              yourPlayerGoal.scaleToWidth(
                props.coords.yourPlayerGoalScaleToWidth
              );
            }
          }
          fabricRef.current.add(yourPlayerGoal);
        });
      } else {
        if (props.coords.opponentPlayerOneGoalTop) {
          const font = new FontFaceObserver(
            props.coords.yourPlayerGoalFontFamily
          );
          font.load().then(() => {
            const yourPlayerGoal = new fabric.Text(
              props.yourPlayerThreeGoal.toUpperCase(),
              {
                top: props.coords.opponentPlayerThreeGoalTop,
                left: props.coords.opponentPlayerThreeGoalLeft,
                fontFamily: props.coords.yourPlayerGoalFontFamily,
                fontSize: props.coords.yourPlayerGoalFontSize,
                selectable: false,
                fill: props.coords.yourPlayerGoalFill,
                className: "yourPlayerGoalThree",
                originX: props.coords.opponentPlayerGoalOriginX,
                originY: props.coords.opponentPlayerGoalOriginY,
              }
            );
            if (props.coords.yourPlayerGoalWidth) {
              yourPlayerGoal.set({
                width: props.coords.yourPlayerGoalWidth,
              });
            }
            if (props.coords.yourPlayerGoalScaleToWidth) {
              if (
                yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
              ) {
                yourPlayerGoal.scaleToWidth(
                  props.coords.yourPlayerGoalScaleToWidth
                );
              }
            }
            fabricRef.current.add(yourPlayerGoal);
          });
        } else {
          const font = new FontFaceObserver(
            props.coords.yourPlayerGoalFontFamily
          );
          font.load().then(() => {
            const yourPlayerGoal = new fabric.Text(
              props.yourPlayerThreeGoal.toUpperCase(),
              {
                top: props.coords.yourPlayerThreeGoalTop,
                left: props.coords.yourPlayerThreeGoalLeft,
                fontFamily: props.coords.yourPlayerGoalFontFamily,
                fontSize: props.coords.yourPlayerGoalFontSize,
                selectable: false,
                fill: props.coords.yourPlayerGoalFill,
                className: "yourPlayerGoalThree",
                originX: props.coords.yourPlayerGoalOriginX,
                originY: props.coords.yourPlayerGoalOriginY,
              }
            );
            if (props.coords.yourPlayerGoalWidth) {
              yourPlayerGoal.set({
                width: props.coords.yourPlayerGoalWidth,
              });
            }
            if (props.coords.yourPlayerGoalScaleToWidth) {
              if (
                yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
              ) {
                yourPlayerGoal.scaleToWidth(
                  props.coords.yourPlayerGoalScaleToWidth
                );
              }
            }
            fabricRef.current.add(yourPlayerGoal);
          });
        }
      }
    }
  };

  yourPlayerGoalThree();

  const yourPlayerGoalFour = () => {
    if (props.yourPlayerFourGoal) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourPlayerGoalFour") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.radioChecked == "radio1") {
        const font = new FontFaceObserver(
          props.coords.yourPlayerGoalFontFamily
        );
        font.load().then(() => {
          const yourPlayerGoal = new fabric.Text(
            props.yourPlayerFourGoal.toUpperCase(),
            {
              top: props.coords.yourPlayerFourGoalTop,
              left: props.coords.yourPlayerFourGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "yourPlayerGoalFour",
              originX: props.coords.yourPlayerGoalOriginX,
              originY: props.coords.yourPlayerGoalOriginY,
            }
          );
          if (props.coords.yourPlayerGoalWidth) {
            yourPlayerGoal.set({
              width: props.coords.yourPlayerGoalWidth,
            });
          }
          if (props.coords.yourPlayerGoalScaleToWidth) {
            if (
              yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
            ) {
              yourPlayerGoal.scaleToWidth(
                props.coords.yourPlayerGoalScaleToWidth
              );
            }
          }
          fabricRef.current.add(yourPlayerGoal);
        });
      } else {
        if (props.coords.opponentPlayerOneGoalTop) {
          const font = new FontFaceObserver(
            props.coords.yourPlayerGoalFontFamily
          );
          font.load().then(() => {
            const yourPlayerGoal = new fabric.Text(
              props.yourPlayerFourGoal.toUpperCase(),
              {
                top: props.coords.opponentPlayerFourGoalTop,
                left: props.coords.opponentPlayerFourGoalLeft,
                fontFamily: props.coords.yourPlayerGoalFontFamily,
                fontSize: props.coords.yourPlayerGoalFontSize,
                selectable: false,
                fill: props.coords.yourPlayerGoalFill,
                className: "yourPlayerGoalFour",
                originX: props.coords.opponentPlayerGoalOriginX,
                originY: props.coords.opponentPlayerGoalOriginY,
              }
            );
            if (props.coords.yourPlayerGoalWidth) {
              yourPlayerGoal.set({
                width: props.coords.yourPlayerGoalWidth,
              });
            }
            if (props.coords.yourPlayerGoalScaleToWidth) {
              if (
                yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
              ) {
                yourPlayerGoal.scaleToWidth(
                  props.coords.yourPlayerGoalScaleToWidth
                );
              }
            }
            fabricRef.current.add(yourPlayerGoal);
          });
        } else {
          const font = new FontFaceObserver(
            props.coords.yourPlayerGoalFontFamily
          );
          font.load().then(() => {
            const yourPlayerGoal = new fabric.Text(
              props.yourPlayerFourGoal.toUpperCase(),
              {
                top: props.coords.yourPlayerFourGoalTop,
                left: props.coords.yourPlayerFourGoalLeft,
                fontFamily: props.coords.yourPlayerGoalFontFamily,
                fontSize: props.coords.yourPlayerGoalFontSize,
                selectable: false,
                fill: props.coords.yourPlayerGoalFill,
                className: "yourPlayerGoalFour",
                originX: props.coords.yourPlayerGoalOriginX,
                originY: props.coords.yourPlayerGoalOriginY,
              }
            );
            if (props.coords.yourPlayerGoalWidth) {
              yourPlayerGoal.set({
                width: props.coords.yourPlayerGoalWidth,
              });
            }
            if (props.coords.yourPlayerGoalScaleToWidth) {
              if (
                yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
              ) {
                yourPlayerGoal.scaleToWidth(
                  props.coords.yourPlayerGoalScaleToWidth
                );
              }
            }
            fabricRef.current.add(yourPlayerGoal);
          });
        }
      }
    }
  };

  yourPlayerGoalFour();

  const yourPlayerGoalFive = () => {
    if (props.yourPlayerFiveGoal) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourPlayerGoalFive") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.radioChecked === "radio1") {
        const font = new FontFaceObserver(
          props.coords.yourPlayerGoalFontFamily
        );
        font.load().then(() => {
          const yourPlayerGoal = new fabric.Text(
            props.yourPlayerFiveGoal.toUpperCase(),
            {
              top: props.coords.yourPlayerFiveGoalTop,
              left: props.coords.yourPlayerFiveGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "yourPlayerGoalFive",
              originX: props.coords.yourPlayerGoalOriginX,
              originY: props.coords.yourPlayerGoalOriginY,
            }
          );
          if (props.coords.yourPlayerGoalWidth) {
            yourPlayerGoal.set({
              width: props.coords.yourPlayerGoalWidth,
            });
          }
          if (props.coords.yourPlayerGoalScaleToWidth) {
            if (
              yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
            ) {
              yourPlayerGoal.scaleToWidth(
                props.coords.yourPlayerGoalScaleToWidth
              );
            }
          }
          fabricRef.current.add(yourPlayerGoal);
        });
      } else {
        if (props.coords.opponentPlayerOneGoalTop) {
          const font = new FontFaceObserver(
            props.coords.yourPlayerGoalFontFamily
          );
          font.load().then(() => {
            
            const yourPlayerGoal = new fabric.Text(
              props.yourPlayerFiveGoal.toUpperCase(),
              {
                top: props.coords.opponentPlayerFiveGoalTop,
                left: props.coords.opponentPlayerFiveGoalLeft,
                fontFamily: props.coords.yourPlayerGoalFontFamily,
                fontSize: props.coords.yourPlayerGoalFontSize,
                selectable: false,
                fill: props.coords.yourPlayerGoalFill,
                className: "yourPlayerGoalFive",
                originX: props.coords.opponentPlayerGoalOriginX,
                originY: props.coords.opponentPlayerGoalOriginY,
              }
            );
            if (props.coords.yourPlayerGoalWidth) {
              yourPlayerGoal.set({
                width: props.coords.yourPlayerGoalWidth,
              });
            }
            if (props.coords.yourPlayerGoalScaleToWidth) {
              if (
                yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
              ) {
                yourPlayerGoal.scaleToWidth(
                  props.coords.yourPlayerGoalScaleToWidth
                );
              }
            }
            fabricRef.current.add(yourPlayerGoal);
          });
        } else {
          const font = new FontFaceObserver(
            props.coords.yourPlayerGoalFontFamily
          );
          font.load().then(() => {
            const yourPlayerGoal = new fabric.Text(
              props.yourPlayerFiveGoal.toUpperCase(),
              {
                top: props.coords.yourPlayerFiveGoalTop,
                left: props.coords.yourPlayerFiveGoalLeft,
                fontFamily: props.coords.yourPlayerGoalFontFamily,
                fontSize: props.coords.yourPlayerGoalFontSize,
                selectable: false,
                fill: props.coords.yourPlayerGoalFill,
                className: "yourPlayerGoalFive",
                originX: props.coords.yourPlayerGoalOriginX,
                originY: props.coords.yourPlayerGoalOriginY,
              }
            );
            if (props.coords.yourPlayerGoalWidth) {
              yourPlayerGoal.set({
                width: props.coords.yourPlayerGoalWidth,
              });
            }
            if (props.coords.yourPlayerGoalScaleToWidth) {
              if (
                yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
              ) {
                yourPlayerGoal.scaleToWidth(
                  props.coords.yourPlayerGoalScaleToWidth
                );
              }
            }
            fabricRef.current.add(yourPlayerGoal);
          });
        }
      }
    }
  };

  yourPlayerGoalFive();

  const yourPlayerGoalSix = () => {
    if (props.yourPlayerSixGoal) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourPlayerGoalSix") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.radioChecked === "radio1") {
        const font = new FontFaceObserver(
          props.coords.yourPlayerGoalFontFamily
        );
        font.load().then(() => {
          const yourPlayerGoal = new fabric.Text(
            props.yourPlayerSixGoal.toUpperCase(),
            {
              top: props.coords.yourPlayerSixGoalTop,
              left: props.coords.yourPlayerSixGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "yourPlayerGoalSix",
              originX: props.coords.yourPlayerGoalOriginX,
              originY: props.coords.yourPlayerGoalOriginY,
            }
          );
          if (props.coords.yourPlayerGoalWidth) {
            yourPlayerGoal.set({
              width: props.coords.yourPlayerGoalWidth,
            });
          }
          if (props.coords.yourPlayerGoalScaleToWidth) {
            if (
              yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
            ) {
              yourPlayerGoal.scaleToWidth(
                props.coords.yourPlayerGoalScaleToWidth
              );
            }
          }
          fabricRef.current.add(yourPlayerGoal);
        });
      } else {
        if (props.coords.opponentPlayerOneGoalTop) {
          const font = new FontFaceObserver(
            props.coords.yourPlayerGoalFontFamily
          );
          font.load().then(() => {
            const yourPlayerGoal = new fabric.Text(
              props.yourPlayerSixGoal.toUpperCase(),
              {
                top: props.coords.opponentPlayerSixGoalTop,
                left: props.coords.opponentPlayerSixGoalLeft,
                fontFamily: props.coords.yourPlayerGoalFontFamily,
                fontSize: props.coords.yourPlayerGoalFontSize,
                selectable: false,
                fill: props.coords.yourPlayerGoalFill,
                className: "yourPlayerGoalSix",
                originX: props.coords.opponentPlayerGoalOriginX,
                originY: props.coords.opponentPlayerGoalOriginY,
              }
            );
            if (props.coords.yourPlayerGoalWidth) {
              yourPlayerGoal.set({
                width: props.coords.yourPlayerGoalWidth,
              });
            }
            if (props.coords.yourPlayerGoalScaleToWidth) {
              if (
                yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
              ) {
                yourPlayerGoal.scaleToWidth(
                  props.coords.yourPlayerGoalScaleToWidth
                );
              }
            }
            fabricRef.current.add(yourPlayerGoal);
          });
        } else {
          const font = new FontFaceObserver(
            props.coords.yourPlayerGoalFontFamily
          );
          font.load().then(() => {
            const yourPlayerGoal = new fabric.Text(
              props.yourPlayerSixGoal.toUpperCase(),
              {
                top: props.coords.yourPlayerSixGoalTop,
                left: props.coords.yourPlayerSixGoalLeft,
                fontFamily: props.coords.yourPlayerGoalFontFamily,
                fontSize: props.coords.yourPlayerGoalFontSize,
                selectable: false,
                fill: props.coords.yourPlayerGoalFill,
                className: "yourPlayerGoalSix",
                originX: props.coords.yourPlayerGoalOriginX,
                originY: props.coords.yourPlayerGoalOriginY,
              }
            );
            if (props.coords.yourPlayerGoalWidth) {
              yourPlayerGoal.set({
                width: props.coords.yourPlayerGoalWidth,
              });
            }
            if (props.coords.yourPlayerGoalScaleToWidth) {
              if (
                yourPlayerGoal.width > props.coords.yourPlayerGoalScaleToWidth
              ) {
                yourPlayerGoal.scaleToWidth(
                  props.coords.yourPlayerGoalScaleToWidth
                );
              }
            }
            fabricRef.current.add(yourPlayerGoal);
          });
        }
      }
    }
  };

  yourPlayerGoalSix();

  
  useEffect(() => {
    yourKolejka();
  },[props.posterBackGround, props.themeOption, props.kolejka])
    

 
  useEffect(() => {
    yourLeague();
  }, [props.league, props.themeOption, props.posterBackGround]);

 
  useEffect(() => {

    initFabric(); 
  }, [props.posterBackGround]);
 
  useEffect(() => {
    teamLogo();
     teamName(yourTeamLogo, poster);
  }, [props.radioChecked, props.posterBackGround, yourTeamLogo]);
  
  useEffect(() => {
    secondTeamLogo(yourTeamLogo);
  }, [props.posterBackGround]);

  
  useEffect(() => {
     
  }, [props.radioChecked,  props.posterBackGround]);

  useEffect(() => {
    opponentLogo(props);
  }, [
    props.radioChecked,
    props.themeOption,
    props.opponent,
    props.posterBackGround,
  ]);

  useEffect(() => {
    opponentsName(props, poster);
  }, [
    props.radioChecked,
    props.themeOption,
    props.opponentName,
    props.posterBackGround,
  ]);
  useEffect(() => {
  typeDate();
},[props.posterBackGround, props.radioChecked, props.date])
  
useEffect(() => {
  typePlace();
},[props.posterBackGround, props.radioChecked, props.place])
  
 useEffect(() => {
  yourResult(fabricRef, props);
  opponentResult(fabricRef, props);
 },[props.posterBackGround, props.radioChecked, props.yourTeamResult, props.yourOpponentResult])
  

  return (
    <>
      <canvas
        id="canvas"
        className="resposive-canvas"
        crossOrigin="anonymous"
        ref={fabricRef}
      />
    </>
  );
}

export default MatchPoster;

import "../../../fonts/Russo_One.ttf";
import "../../../fonts/Poppins-BoldItalic.ttf";
import "../../../fonts/Goldman-Bold.ttf";
import "../../../fonts/Goldman-Regular.ttf";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useParams } from "react-router-dom";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import FontFaceObserver from "fontfaceobserver";

function MatchPoster(props) {
  const [isPoster, setIsPoster] = useState(null);
  const { poster } = useParams();
  const backImg = new Image();
  backImg.src = props.posterBackGround;
  const [yourTeamLogo, setYourTeamLogo] = useState(props.yourLogo);
  const { user } = useAuthContext();
  const canvasRef = useRef();
  const fabricRef = useRef();

  const [logo, setLogo] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  const opponentGoalOne = () => {
    if (props.opponentGoalOneName) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "opponentGoalOne") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.radioChecked === "radio1") {
        const font = new FontFaceObserver(
          props.coords.yourPlayerGoalFontFamily
        );
        font.load().then(() => {
          const yourPlayerGoal = new fabric.Text(
            props.opponentGoalOneName.toUpperCase(),
            {
              top: props.coords.opponentPlayerOneGoalTop,
              left: props.coords.opponentPlayerOneGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "opponentGoalOne",
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
            props.opponentGoalOneName.toUpperCase(),
            {
              top: props.coords.yourPlayerOneGoalTop,
              left: props.coords.yourPlayerOneGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "opponentGoalOne",
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
  };

  opponentGoalOne();

  const opponentGoalTwo = () => {
    if (props.opponentGoalTwoName) {
      
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "opponentGoalTwo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.radioChecked === "radio1") {
        const font = new FontFaceObserver(
          props.coords.yourPlayerGoalFontFamily
        );
        font.load().then(() => {
          const yourPlayerGoal = new fabric.Text(
            props.opponentGoalTwoName.toUpperCase(),
            {
              top: props.coords.opponentPlayerTwoGoalTop,
              left: props.coords.opponentPlayerTwoGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "opponentGoalTwo",
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
            props.opponentGoalTwoName.toUpperCase(),
            {
              top: props.coords.yourPlayerTwoGoalTop,
              left: props.coords.yourPlayerTwoGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "opponentGoalTwo",
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
  };

  opponentGoalTwo();

  const opponentGoalThree = () => {
    if (props.opponentGoalThreeName) {
      
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "opponentGoalThree") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.radioChecked === "radio1") {
        const font = new FontFaceObserver(
          props.coords.yourPlayerGoalFontFamily
        );
        font.load().then(() => {
          const yourPlayerGoal = new fabric.Text(
            props.opponentGoalThreeName.toUpperCase(),
            {
              top: props.coords.opponentPlayerThreeGoalTop,
              left: props.coords.opponentPlayerThreeGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "opponentGoalThree",
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
            props.opponentGoalThreeName.toUpperCase(),
            {
              top: props.coords.yourPlayerThreeGoalTop,
              left: props.coords.yourPlayerThreeGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "opponentGoalThree",
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
  };

  opponentGoalThree();

  const opponentGoalFour = () => {
    if (props.opponentGoalFourName) {
      
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "opponentGoalFour") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.radioChecked === "radio1") {
        const font = new FontFaceObserver(
          props.coords.yourPlayerGoalFontFamily
        );
        font.load().then(() => {
          const yourPlayerGoal = new fabric.Text(
            props.opponentGoalFourName.toUpperCase(),
            {
              top: props.coords.opponentPlayerFourGoalTop,
              left: props.coords.opponentPlayerFourGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "opponentGoalFour",
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
            props.opponentGoalFourName.toUpperCase(),
            {
              top: props.coords.yourPlayerFourGoalTop,
              left: props.coords.yourPlayerFourGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "opponentGoalFour",
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
  };

  opponentGoalFour();

  const opponentGoalFive = () => {
    if (props.opponentGoalFiveName) {
      
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "opponentGoalFive") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.radioChecked === "radio1") {
        const font = new FontFaceObserver(
          props.coords.yourPlayerGoalFontFamily
        );
        font.load().then(() => {
          const yourPlayerGoal = new fabric.Text(
            props.opponentGoalFiveName.toUpperCase(),
            {
              top: props.coords.opponentPlayerFiveGoalTop,
              left: props.coords.opponentPlayerFiveGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "opponentGoalFive",
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
            props.opponentGoalFiveName.toUpperCase(),
            {
              top: props.coords.yourPlayerFiveGoalTop,
              left: props.coords.yourPlayerFiveGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "opponentGoalFive",
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
  };

  opponentGoalFive();

  const opponentGoalSix = () => {
    if (props.opponentGoalSixName) {
      
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "opponentGoalSix") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      if (props.radioChecked === "radio1") {
        const font = new FontFaceObserver(
          props.coords.yourPlayerGoalFontFamily
        );
        font.load().then(() => {
          const yourPlayerGoal = new fabric.Text(
            props.opponentGoalSixName.toUpperCase(),
            {
              top: props.coords.opponentPlayerSixGoalTop,
              left: props.coords.opponentPlayerSixGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "opponentGoalSix",
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
            props.opponentGoalSixName.toUpperCase(),
            {
              top: props.coords.yourPlayerSixGoalTop,
              left: props.coords.yourPlayerSixGoalLeft,
              fontFamily: props.coords.yourPlayerGoalFontFamily,
              fontSize: props.coords.yourPlayerGoalFontSize,
              selectable: false,
              fill: props.coords.yourPlayerGoalFill,
              className: "opponentGoalSix",
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
  };

  opponentGoalSix();

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

  const yourKolejka = () => {
    if (props.kolejka) {
      if (fabricRef.current && props.kolejka === "") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "yourKolejka") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
      }
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourKolejka") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const font = new FontFaceObserver(props.coords.yourKolejkaFontFamily);
      font.load().then(() => {
        if (props.poster === "wsAn3pPtaand0xDdNZ5S") {
          props.kolejka = props.kolejka.toUpperCase();
        }
        const yourKolejka = new fabric.Text(props.kolejka, {
          top: props.coords.yourKolejkaTop,
          left: props.coords.yourKolejkaLeft,
          fontFamily: props.coords.yourKolejkaFontFamily,
          selectable: false,
          fill: props.coords.yourKolejkaFill,
          className: "yourKolejka",
          originX: props.coords.yourKolejkaOriginX,
          originY: props.coords.yourKolejkaOriginY,
        });
        if (props.coords.yourKolejkaCharSpacing) {
          yourKolejka.set({
            charSpacing: props.coords.yourKolejkaCharSpacing,
          });
        }

        if (props.coords.yourKolejkaWidth) {
          yourKolejka.set({
            width: props.coords.yourKolejkaWidth,
          });
        }
        if (props.coords.yourKolejkaScaleToHeight) {
          yourKolejka.scaleToHeight(props.coords.yourKolejkaScaleToHeight);
        }
        if (props.coords.yourKolejkaFontSize) {
          yourKolejka.set({
            fontSize: props.coords.yourKolejkaFontSize,
          });
        }
        if (yourKolejka.width > props.coords.yourKolejkaScaleToWidth) {
          yourKolejka.scaleToWidth(props.coords.yourKolejkaScaleToWidth);
        }
        fabricRef.current.add(yourKolejka);
      });
    }
  };

  yourKolejka();

  const yourLeague = () => {
    if (props.league) {
      if (fabricRef.current && props.league === "") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourLeague") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
      }
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "yourLeague") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });

      const font = new FontFaceObserver(props.coords.yourLeagueFontFamily);
      font.load().then(() => {
        if (props.poster === "mvzttPwmXvDWCz4vJefn") {
          props.league = props.league.toUpperCase();
        }
        const yourLeague = new fabric.Text(props.league, {
          top: props.coords.yourLeagueTop,
          left: props.coords.yourLeagueLeft,
          fontFamily: props.coords.yourLeagueFontFamily,
          selectable: false,
          fill: props.coords.yourLeagueFill,
          className: "yourLeague",
          originX: props.coords.yourLeagueOriginX,
          originY: props.coords.yourLeagueOriginY,
        });

        if (props.coords.yourLeagueWidth) {
          yourLeague.set({
            width: props.coords.yourLeagueWidth,
          });
        }
        if (props.coords.yourLeagueScaleToHeight) {
          yourLeague.scaleToHeight(props.coords.yourLeagueScaleToHeight);
        }
        if (props.coords.yourLeagueFontSize) {
          yourLeague.set({
            fontSize: props.coords.yourLeagueFontSize,
          });
        }
        if (yourLeague.width > props.coords.yourLeagueScaleToWidth) {
          yourLeague.scaleToWidth(props.coords.yourLeagueScaleToWidth);
        }
        fabricRef.current.add(yourLeague);
      });
    }
  };
  useEffect(() => {
    yourLeague();
  }, [props.league, props.themeOption, props.posterBackGround]);

  const yourResult = () => {
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
  const opponentResult = () => {
    if (props.yourOpponentResult) {
      if (props.radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourOpponentResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const font = new FontFaceObserver(
          props.coords.yourOpponentResultFontFamily
        );
        font.load().then(() => {
          const result = new fabric.Text(props.yourOpponentResult, {
            top: props.coords.yourOpponentResultTop,
            left: props.coords.yourOpponentResultLeft,
            width: props.coords.yourOpponentResult,
            fontFamily: props.coords.yourOpponentResultFontFamily,
            selectable: false,
            fill: props.coords.yourOpponentResultFill,
            className: "yourOpponentResult",
            originX: props.coords.yourOpponentResultOriginX,
            originY: props.coords.yourOpponentResultOriginY,
          });

          result.scaleToHeight(props.coords.yourOpponentResultScaleToHeight);
          if (result.width >= props.coords.yourOpponentResultWidth) {
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
      } else {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className == "yourOpponentResult") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const result = new fabric.Text(props.yourOpponentResult, {
          top: props.coords.yourTeamResultTop,
          left: props.coords.yourTeamResultLeft,
          width: props.coords.yourTeamResultWidth,
          fontFamily: props.coords.yourTeamResultFontFamily,
          selectable: false,
          fill: props.coords.yourTeamResultFill,
          className: "yourOpponentResult",
          originX: props.coords.yourTeamResultOriginX,
          originY: props.coords.yourTeamResultOriginY,
        });
        result.scaleToHeight(props.coords.yourTeamResultScaleToHeight);
        if (result.width >= props.coords.yourTeamResultWidth) {
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
      }
    }
  };

  const typePlace = () => {
    if (props.place) {
      if (fabricRef.current && props.place === "") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "typePlace") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
      }

      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "typePlace") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });

      const font = new FontFaceObserver(props.coords.typePlaceFontFamily);
      
        font.load().then(() => {
      const typePlace = new fabric.Text(props.place.toUpperCase(), {
        selectable: false,
        charSpacing: props.coords.typePlaceCharSpacing,
        textAlign: "center",
        top: props.coords.typePlaceTop,
        left: props.coords.typePlaceLeft,
        width: props.coords.typePlaceWidth,
        className: "typePlace",
        fontSize: props.coords.typePlaceFontSize,
        fill: props.coords.typePlaceFill,
        originX: props.coords.typePlaceOriginX,
        originY: props.coords.typePlaceOriginY,
        fontFamily: props.coords.typePlaceFontFamily,
      });
      

      if (typePlace.width >= props.coords.typePlaceScaleToWidth) {
        typePlace.scaleToWidth(props.coords.typePlaceScaleToWidth);
      }
      if (props.themeOption) {
        if (
          props.themeOption.label.split("-")[0] === "biało" ||
          props.themeOption.label.split("-")[0] === "żółto" ||
          props.themeOption.label === "biały"
        ) {
          typePlace.set({
            fill: "black",
          });
        } else {
          typePlace.set({
            fill: props.coords.typePlaceFill,
          });
        }
        if (
          props.id.theme === "motyw 2" &&
          props.themeOption.label === "żółto-czarny"
        ) {
          typePlace.set({
            fill: "white",
          });
        }
        if (props.id.theme === "motyw 3") {
          typePlace.set({
            fill: "white",
          });
        }
        if (
          props.id.theme === "motyw 4" &&
          props.themeOption.label === "żółto-czarny"
        ) {
          typePlace.set({
            fill: "white",
          });
        }
        if (
          props.id.theme === "motyw 4" &&
          props.themeOption.label === "czarno-biały"
        ) {
          typePlace.set({
            fill: "black",
          });
        }
        if (
          props.id.theme === "motyw 4" &&
          props.themeOption.label === "niebieski"
        ) {
          typePlace.set({
            fill: "black",
          });
        }
        if (
          props.id.theme === "motyw 4" &&
          props.themeOption.label === "zielony"
        ) {
          typePlace.set({
            fill: "black",
          });
        }
        if (
          props.id.theme === "motyw 4" &&
          props.themeOption.label === "biało-niebieski"
        ) {
          typePlace.set({
            fill: "white",
          });
        }
        if (
          props.id.theme === "motyw 5" &&
          (props.themeOption.label === "żółto-czarny" ||
            props.themeOption.label === "biało-niebieski")
        ) {
          typePlace.set({
            fill: "white",
          });
        }
      }
      fabricRef.current.add(typePlace);
    });
      
    }
  };

  const typeDate = () => {
    if (fabricRef.current && props.date === "") {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "typeDate") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
    }
    if (props.date) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className == "typeDate") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const font = new FontFaceObserver(props.coords.typeDataFontFamily);
      font.load().then(() => {
      const typeDate = new fabric.Text(props.date.toUpperCase(), {
        selectable: false,
        top: props.coords.typeDataTop,
        left: props.coords.typeDataLeft,
        // width: props.coords.typeDataWidth,
        className: "typeDate",
        fontSize: props.coords.typeDataFontSize,
        fill: props.coords.typeDataFill,
        originX: props.coords.typeDataOriginX,
        originY: props.coords.typeDataOriginY,
        fontFamily: props.coords.typeDataFontFamily,
        charSpacing: props.coords.typeDataCharSpacing,
      });

      
      
      
      if (typeDate.width >= props.coords.typeDataScaleToWidth) {
        typeDate.scaleToWidth(props.coords.typeDataScaleToWidth);
      }
      if (props.themeOption) {
        if (
          props.themeOption.label.split("-")[0] === "biało" ||
          props.themeOption.label.split("-")[0] === "żółto" ||
          props.themeOption.label === "biały"
        ) {
          typeDate.set({
            fill: "black",
          });
        } else {
          typeDate.set({
            fill: props.coords.typeDataFill,
          });
        }
        if (
          props.id.theme === "motyw 2" &&
          props.themeOption.label === "żółto-czarny"
        ) {
          typeDate.set({
            fill: "white",
          });
        }
        if (props.id.theme === "motyw 3") {
          typeDate.set({
            fill: "white",
          });
        }

        if (
          props.id.theme === "motyw 4" &&
          props.themeOption.label === "żółto-czarny"
        ) {
          typeDate.set({
            fill: "white",
          });
        }
        if (
          props.id.theme === "motyw 4" &&
          props.themeOption.label === "czarno-biały"
        ) {
          typeDate.set({
            fill: "black",
          });
        }
        if (
          props.id.theme === "motyw 4" &&
          props.themeOption.label === "niebieski"
        ) {
          typeDate.set({
            fill: "black",
          });
        }
        if (
          props.id.theme === "motyw 4" &&
          props.themeOption.label === "zielony"
        ) {
          typeDate.set({
            fill: "black",
          });
        }
        if (
          props.id.theme === "motyw 4" &&
          props.themeOption.label === "biało-niebieski"
        ) {
          typeDate.set({
            fill: "white",
          });
        }
      }

      fabricRef.current.add(typeDate);
    });
    }
  };

  const opponentLogo = () => {
    if (props.opponent) {
      if (props.radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentImage") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const opponentImg = new Image();
        opponentImg.src = props.opponent;
        opponentImg.onload = () => {
          fabric.Image.fromURL(opponentImg.src, function (img) {
            img.set({
              selectable: false,
              top: props.coords.opponentImageTop,
              left: props.coords.opponentImageLeft,
              className: "opponentImage",
              originX: "center",
              originY: "center",
            });

            img.scaleToHeight(props.coords.opponentImageScaleToHeight);

            fabricRef.current.add(img);
          });
        };
      } else {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentImage") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const opponentImg = new Image();
        opponentImg.src = props.opponent;
        opponentImg.onload = () => {
          fabric.Image.fromURL(opponentImg.src, function (img) {
            img.set({
              selectable: false,
              top: props.coords.yourTeamLogoTop,
              left: props.coords.yourTeamLogoLeft,
              className: "opponentImage",
              originX: "center",
              originY: "center",
            });

            img.scaleToHeight(props.coords.yourTeamLogoScaleToHeight);

            fabricRef.current.add(img);
          });
        };
      }
    }
  };
  const opponentsName = () => {
    if (props.opponentName) {
      if (props.radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentsFirstName") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentsSecondName") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentsName") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        if (props.coords.opponentFirstNameFontFamily) {
          const opponentFirstName = props.opponentName.split(" ")[0];

          const opponentSecondName = props.opponentName.split(" ")[1];
          const font = new FontFaceObserver(
            props.coords.opponentFirstNameFontFamily
          );
          font.load().then(() => {
            const firstName = new fabric.Text(opponentFirstName.toUpperCase(), {
              selectable: false,
              top: props.coords.opponentFirstNameTop,
              left: props.coords.opponentFirstNameLeft,
              originY: props.coords.opponentFirstNameOriginY,
              originX: props.coords.opponentFirstNameOriginX,
              fontSize: props.coords.opponentFirstNameFontSize,
              width: props.coords.opponentFirstNameWidth,
              fill: props.coords.opponentFirstNameFill,
              className: "opponentsFirstName",
              fontFamily: props.coords.opponentFirstNameFontFamily,
            });
            if (props.coords.opponentFirstNameScaleToWidth) {
              firstName.scaleToWidth(
                props.coords.opponentFirstNameScaleToWidth
              );
            }
            if (props.coords.opponentFirstNameScaleToHeight) {
              firstName.scaleToHeight(
                props.coords.opponentFirstNameScaleToHeight
              );
            }
            if (firstName.width > props.coords.opponentFirstNameWidth) {
              firstName.scaleToWidth(
                props.coords.opponentFirstNameScaleToWidth
              );
            }
            if (props.themeOption) {
              if (
                props.themeOption.label.split("-")[0] === "biało" ||
                props.themeOption.label.split("-")[0] === "żółto" ||
                props.themeOption.label === "biały"
              ) {
                firstName.set({
                  fill: "black",
                });
              }
            }
            fabricRef.current.add(firstName);
          });
          const fontTwo = new FontFaceObserver(
            props.coords.opponentSecondNameFontFamily
          );
          fontTwo.load().then(() => {
            if (poster !== "K1iRaLYzkSdrg3vBRyDL") {
              const secondName = new fabric.Text(
                opponentSecondName.toUpperCase(),
                {
                  selectable: false,
                  top: props.coords.opponentSecondNameTop,
                  left: props.coords.opponentSecondNameLeft,
                  originY: props.coords.opponentSecondNameOriginY,
                  originX: props.coords.opponentSecondNameOriginX,
                  fontSize: props.coords.opponentSecondNameFontSize,
                  width: props.coords.opponentSecondNameWidth,
                  fill: props.coords.opponentSecondNameFill,
                  className: "opponentsSecondName",
                  fontFamily: props.coords.opponentSecondNameFontFamily,
                }
              );

              secondName.scaleToHeight(
                props.coords.opponentSecondNameScaleToHeight
              );
              if (secondName.width > props.coords.opponentSecondNameWidth) {
                secondName.scaleToWidth(
                  props.coords.opponentSecondNameScaleToWidth
                );
              }
              if (props.themeOption) {
                if (
                  props.themeOption.label.split("-")[0] === "biało" ||
                  props.themeOption.label.split("-")[0] === "żółto" ||
                  props.themeOption.label === "biały"
                ) {
                  secondName.set({
                    fill: "black",
                  });
                }
              }

              fabricRef.current.add(secondName);
            }
          });
        } else {
          const fontOpponent = new FontFaceObserver(
            props.coords.opponentNameFontFamily
          );

          fontOpponent.load().then(() => {
            if (poster !== "K1iRaLYzkSdrg3vBRyDL") {
              const opponentsName = new fabric.Text(
                props.opponentName.toUpperCase(),
                {
                  selectable: false,
                  top: props.coords.opponentNameTop,
                  left: props.coords.opponentNameLeft,
                  originY: props.coords.opponentNameOriginY,
                  originX: props.coords.opponentNameOriginX,
                  fontSize: props.coords.opponentNameFontSize,
                  width: props.coords.opponentNameWidth,
                  fill: props.coords.opponentNameFill,
                  className: "opponentsName",
                  fontFamily: props.coords.opponentNameFontFamily,
                }
              );
              if (opponentsName.width > props.coords.opponentNameScaleToWidth) {
                opponentsName.scaleToWidth(
                  props.coords.opponentNameScaleToWidth
                );
              }
              if (props.themeOption) {
                if (
                  props.themeOption.label.split("-")[0] === "biało" ||
                  props.themeOption.label.split("-")[0] === "żółto" ||
                  props.themeOption.label === "biały"
                ) {
                  opponentsName.set({
                    fill: "black",
                  });
                }
                if (
                  poster === "FkbRjeu4p2PvRryL8byB" ||
                  poster === "PmoRESwg91LxFAGFObbZ" ||
                  props.themeOption.label === "żółto-czarny"
                ) {
                  opponentsName.set({
                    fill: "white",
                  });
                }
                if (
                  props.id.theme === "motyw 5" &&
                  (props.themeOption.label === "żółto-czarny" ||
                    props.themeOption.label === "biało-niebieski")
                ) {
                  opponentsName.set({
                    fill: "white",
                  });
                }
              }

              fabricRef.current.add(opponentsName);
            }
          });
        }
      } else if (props.radioChecked === "radio2") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentsFirstName") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentsSecondName") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "opponentsName") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        if (props.coords.opponentFirstNameFontFamily) {
          const opponentFirstName = props.opponentName.split(" ")[0];

          const opponentSecondName = props.opponentName.split(" ")[1];

          const firstName = new fabric.Text(opponentFirstName.toUpperCase(), {
            selectable: false,
            top: props.coords.yourTeamFirstNameTop,
            left: props.coords.yourTeamFirstNameLeft,
            originY: props.coords.yourTeamFirstNameOriginY,
            originX: props.coords.yourTeamFirstNameOriginX,
            fontSize: props.coords.yourTeamFirstNameFontSize,
            width: props.coords.yourTeamFirstNameWidth,
            fill: props.coords.yourTeamFirstNameFill,
            className: "opponentsFirstName",
            fontFamily: props.coords.yourTeamFirstNameFontFamily,
          });

          if (props.coords.yourTeamFirstNameScaleToWidth) {
            firstName.scaleToWidth(props.coords.yourTeamFirstNameScaleToWidth);
          }
          if (props.coords.yourTeamFirstNameScaleToHeight) {
            firstName.scaleToHeight(
              props.coords.yourTeamFirstNameScaleToHeight
            );
          }
          if (firstName.width > props.coords.yourTeamFirstNameWidth) {
            firstName.scaleToWidth(props.coords.yourTeamFirstNameScaleToWidth);
          }
          if (props.themeOption) {
            if (
              props.themeOption.label.split("-")[0] === "biało" ||
              props.themeOption.label.split("-")[0] === "żółto" ||
              props.themeOption.label === "biały"
            ) {
              firstName.set({
                fill: "black",
              });
            }
          }
          fabricRef.current.add(firstName);

          if (poster !== "K1iRaLYzkSdrg3vBRyDL") {
            const fontTwo = new FontFaceObserver(
              props.coords.yourTeamSecondNameFontFamily
            );

            fontTwo.load().then(() => {
              const secondName = new fabric.Text(
                opponentSecondName.toUpperCase(),
                {
                  selectable: false,
                  top: props.coords.yourTeamSecondNameTop,
                  left: props.coords.yourTeamSecondNameLeft,
                  originY: props.coords.yourTeamSecondNameOriginY,
                  originX: props.coords.yourTeamSecondNameOriginX,
                  fontSize: props.coords.yourTeamSecondNameFontSize,
                  width: props.coords.yourTeamSecondNameWidth,
                  fill: props.coords.yourTeamSecondNameFill,
                  className: "opponentsSecondName",
                  fontFamily: props.coords.yourTeamSecondNameFontFamily,
                }
              );

              secondName.scaleToHeight(
                props.coords.yourTeamSecondNameScaleToHeight
              );
              if (secondName.width > props.coords.yourTeamSecondNameWidth) {
                secondName.scaleToWidth(
                  props.coords.yourTeamSecondNameScaleToWidth
                );
              }
              if (props.themeOption) {
                if (
                  props.themeOption.label.split("-")[0] === "biało" ||
                  props.themeOption.label.split("-")[0] === "żółto" ||
                  props.themeOption.label === "biały"
                ) {
                  secondName.set({
                    fill: "black",
                  });
                }
              }

              fabricRef.current.add(secondName);
            });
          }
        } else {
          const fontOpponent = new FontFaceObserver(
            props.coords.opponentNameFontFamily
          );

          fontOpponent.load().then(() => {
            const opponentsName = new fabric.Text(
              props.opponentName.toUpperCase(),
              {
                selectable: false,
                top: props.coords.yourTeamNameTop,
                left: props.coords.yourTeamNameLeft,
                originY: props.coords.yourTeamNameOriginY,
                originX: props.coords.yourTeamNameOriginX,
                fontSize: props.coords.yourTeamNameFontSize,
                width: props.coords.yourTeamNameWidth,
                fill: props.coords.yourTeamNameFill,
                className: "opponentsName",
                fontFamily: props.coords.yourTeamNameFontFamily,
              }
            );

            if (opponentsName.width > props.coords.opponentNameScaleToWidth) {
              opponentsName.scaleToWidth(props.coords.opponentNameScaleToWidth);
            }
            if (props.themeOption) {
              if (
                props.themeOption.label.split("-")[0] === "biało" ||
                props.themeOption.label.split("-")[0] === "żółto" ||
                props.themeOption.label === "biały"
              ) {
                opponentsName.set({
                  fill: "black",
                });
              }
              if (
                props.id.theme === "motyw 2" &&
                props.themeOption.label === "żółto-czarny"
              ) {
                opponentsName.set({
                  fill: "white",
                });
              }
              if (
                props.id.theme === "motyw 5" &&
                (props.themeOption.label === "żółto-czarny" ||
                  props.themeOption.label === "biało-niebieski")
              ) {
                opponentsName.set({
                  fill: "white",
                });
              }
            }

            fabricRef.current.add(opponentsName);
          });
        }
      }
    }
  };
  useEffect(() => {
    const initFabric = () => {
      fabricRef.current = new fabric.Canvas("canvas", {
        selection: false,
        width: backImg.width,
        height: backImg.height,
      });
      const img = new Image();
      img.crossOrigin = "Anonymous";

      img.src = props.posterBackGround;

      img.onload = () => {
        const newImg = new fabric.Image.fromURL(img.src, function (img) {
          img.set({
            crossOrigin: "anonymous",
          });
          fabricRef.current.setBackgroundImage(
            img,
            fabricRef.current.renderAll.bind(fabricRef.current, {
              crossOrigin: "anonymous",
            })
          );
        });

        setIsPoster(newImg);
        document.querySelector(".lower-canvas").style.width = img.width + "px";
        document.querySelector(".lower-canvas").style.height =
          img.height + "px";
        document.querySelector(".lower-canvas").width = img.width;
        document.querySelector(".lower-canvas").height = img.height;
        document.querySelector(".upper-canvas").width = img.width;
        document.querySelector(".upper-canvas").height = img.height;
        document.querySelector(".upper-canvas").style.width = img.width + "px";
        document.querySelector(".upper-canvas").style.height =
          img.height + "px";
        document.querySelector(".canvas-container").style.width =
          img.width + "px";
        document.querySelector(".canvas-container").style.height =
          img.height + "px";
      };
    };

    initFabric();
  }, [props.posterBackGround]);
  const teamLogo = () => {
    if (props.yourTeamImage && props.coords.yourTeamLogoTop) {
      if (props.radioChecked === "radio1") {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "teamLogo") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const secondImg = new Image();
        secondImg.src = props.yourTeamImage;
        secondImg.onload = () => {
          fabric.Image.fromURL(secondImg.src, function (img) {
            img.set({
              selectable: false,
              top: props.coords.yourTeamLogoTop,
              left: props.coords.yourTeamLogoLeft,
              originX: "center",
              originY: "center",
              className: "teamLogo",
            });
            img.scaleToHeight(props.coords.yourTeamLogoScaleToHeight);
            fabricRef.current.add(img);
            fabricRef.current.renderAll();
          });
        };
      } else {
        fabricRef.current._objects.forEach((image, i) => {
          if (fabricRef.current.item(i).className === "teamLogo") {
            fabricRef.current.remove(fabricRef.current.item(i));
          }
        });
        const secondImg = new Image();
        secondImg.src = props.yourTeamImage;
        secondImg.onload = () => {
          fabric.Image.fromURL(secondImg.src, function (img) {
            img.set({
              selectable: false,
              top: props.coords.opponentImageTop,
              left: props.coords.opponentImageLeft,
              originX: "center",
              originY: "center",
              className: "teamLogo",
            });
            img.scaleToHeight(props.coords.opponentImageScaleToHeight);
            fabricRef.current.add(img);
            fabricRef.current.renderAll();
          });
        };
      }
    }
  };
  useEffect(() => {
    teamLogo();
  }, [props.radioChecked, props.posterBackGround, props.yourTeamLogo]);
  const secondTeamLogo = () => {
    if (yourTeamLogo[0].img && props.coords.yourTeamSecondLogoTop) {
      fabricRef.current._objects.forEach((image, i) => {
        if (fabricRef.current.item(i).className === "teamSecondLogo") {
          fabricRef.current.remove(fabricRef.current.item(i));
        }
      });
      const secondImg = new Image();
      secondImg.src = yourTeamLogo[0].img;
      secondImg.onload = () => {
        fabric.Image.fromURL(secondImg.src, function (img) {
          img.set({
            selectable: false,
            top: props.coords.yourTeamSecondLogoTop,
            left: props.coords.yourTeamSecondLogoLeft,
            originX: "center",
            originY: "center",
            className: "teamSecondLogo",
          });
          img.scaleToHeight(props.coords.yourTeamSecondLogoScaleToHeight);
          fabricRef.current.add(img);
          fabricRef.current.renderAll();
        });
      };
    }
  };
  useEffect(() => {
    secondTeamLogo();
  }, [props.posterBackGround]);

  const teamName = () => {
    if (yourTeamLogo[0].firstName) {
      if (
        props.coords.yourTeamFirstNameTop ||
        props.coords.yourTeamNameTop ||
        props.coords.yourTeamSecondNameTop
      ) {
        if (props.radioChecked === "radio1") {
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "yourName") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "yourFirstName") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "yourSecondName") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          let yourTeamName;
          if (poster === "23b5ff36a490e8f93breae34") {
            yourTeamName = yourTeamLogo[0].firstName;
          } else if (poster === "PmoRESwg91LxFAGFObbZ") {
            yourTeamName =
              yourTeamLogo[0].firstName.toUpperCase() +
              " " +
              yourTeamLogo[0].secondName.toUpperCase();
          } else {
            yourTeamName =
              yourTeamLogo[0].firstName.toUpperCase() +
              " " +
              yourTeamLogo[0].secondName.toUpperCase();
          }
          if (props.coords.yourTeamFirstNameFontFamily) {
            const firstTeamName = yourTeamLogo[0].firstName.toUpperCase();

            const secondTeamName = yourTeamLogo[0].secondName.toUpperCase();
            const firstFont = new FontFaceObserver(
              props.coords.yourTeamFirstNameFontFamily
            );
            firstFont.load().then(() => {
              const firstName = new fabric.Text(firstTeamName, {
                selectable: false,
                top: props.coords.yourTeamFirstNameTop,
                left: props.coords.yourTeamFirstNameLeft,
                width: props.coords.yourTeamFirstNameWidth,
                fill: props.coords.yourTeamFirstNameFill,
                fontFamily: props.coords.yourTeamFirstNameFontFamily,
                originX: props.coords.yourTeamFirstNameOriginX,
                originY: props.coords.yourTeamFirstNameOriginY,
                className: "yourFirstName",
              });
              if (props.coords.yourTeamFirstNameScaleToWidth) {
                firstName.scaleToWidth(
                  props.coords.yourTeamFirstNameScaleToWidth
                );
              }
              if (props.coords.yourTeamFirstNameScaleToHeight) {
                firstName.scaleToHeight(
                  props.coords.yourTeamFirstNameScaleToHeight
                );
              }
              if (firstName.width > props.coords.yourTeamFirstNameWidth) {
                firstName.scaleToWidth(
                  props.coords.yourTeamFirstNameScaleToWidth
                );
              }
              if (props.themeOption) {
                if (
                  props.themeOption.label.split("-")[0] === "biało" ||
                  props.themeOption.label.split("-")[0] === "żółto" ||
                  props.themeOption.label === "biały"
                ) {
                  firstName.set({
                    fill: "black",
                  });
                }
              }
              fabricRef.current.add(firstName);
            });
            if (poster !== "K1iRaLYzkSdrg3vBRyDL") {
              const secondFont = new FontFaceObserver(
                props.coords.yourTeamSecondNameFontFamily
              );
              secondFont.load().then(() => {
                const secondName = new fabric.Text(secondTeamName, {
                  selectable: false,
                  originX: props.coords.yourTeamSecondNameOriginX,
                  originY: props.coords.yourTeamSecondNameOriginY,
                  top: props.coords.yourTeamSecondNameTop,
                  width: props.coords.yourTeamSecondNameWidth,
                  left: props.coords.yourTeamSecondNameLeft,
                  fill: props.coords.yourTeamSecondNameFill,
                  fontFamily: props.coords.yourTeamSecondNameFontFamily,
                  className: "yourSecondName",
                });
                if (props.coords.yourTeamSecondNameScaleToHeight) {
                  secondName.scaleToHeight(
                    props.coords.yourTeamSecondNameScaleToHeight
                  );
                }
                if (secondName.width > props.coords.yourTeamSecondNameWidth) {
                  secondName.scaleToWidth(
                    props.coords.yourTeamSecondNameScaleToWidth
                  );
                }
                if (props.themeOption) {
                  if (
                    props.themeOption.label.split("-")[0] === "biało" ||
                    props.themeOption.label.split("-")[0] === "żółto" ||
                    props.themeOption.label === "biały"
                  ) {
                    secondName.set({
                      fill: "black",
                    });
                  }
                }

                fabricRef.current.add(secondName);
              });
            }
          } else {
            const font = new FontFaceObserver(
              props.coords.yourTeamNameFontFamily
            );
            font.load().then(() => {
              const name = new fabric.Text(yourTeamName.toUpperCase(), {
                selectable: false,
                originX: props.coords.yourTeamNameOriginX,
                originY: props.coords.yourTeamNameOriginY,
                top: props.coords.yourTeamNameTop,
                left: props.coords.yourTeamNameLeft,
                fill: props.coords.yourTeamNameFill,
                fontFamily: props.coords.yourTeamNameFontFamily,
                className: "yourName",
              });
              if (props.coords.yourTeamNameCharSpacing) {
                name.charSpacing = props.coords.yourTeamNameCharSpacing;
              }
              if (props.coords.yourTeamNameWidth) {
                name.width = props.coords.yourTeamNameWidth;
              }

              name.scaleToWidth(props.coords.yourTeamNameScaleToWidth);
              if (props.themeOption) {
                if (
                  props.themeOption.label.split("-")[0] === "biało" ||
                  props.themeOption.label.split("-")[0] === "żółto" ||
                  props.themeOption.label === "biały"
                ) {
                  name.set({
                    fill: "black",
                  });
                }
                if (
                  poster === "FkbRjeu4p2PvRryL8byB" ||
                  poster === "PmoRESwg91LxFAGFObbZ" ||
                  props.themeOption.label === "żółto-czarny"
                ) {
                  name.set({
                    fill: "white",
                  });
                }
                if (
                  props.id.theme === "motyw 5" &&
                  (props.themeOption.label === "żółto-czarny" ||
                    props.themeOption.label === "biało-niebieski")
                ) {
                  name.set({
                    fill: "white",
                  });
                }
              }
              fabricRef.current.add(name);
            });
          }
        } else if (props.radioChecked === "radio2") {
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "yourName") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "yourFirstName") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "yourSecondName") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          let yourTeamName;
          if (poster === "23b5ff36a490e8f93breae34") {
            yourTeamName = yourTeamLogo[0].firstName;
          } else if (poster === "PmoRESwg91LxFAGFObbZ") {
            yourTeamName =
              yourTeamLogo[0].firstName.toUpperCase() +
              " " +
              yourTeamLogo[0].secondName.toUpperCase();
          } else {
            yourTeamName =
              yourTeamLogo[0].firstName.toUpperCase() +
              " " +
              yourTeamLogo[0].secondName.toUpperCase();
          }
          if (props.coords.yourTeamFirstNameFontFamily) {
            const firstTeamName = yourTeamLogo[0].firstName.toUpperCase();

            const secondTeamName = yourTeamLogo[0].secondName.toUpperCase();
            const font = new FontFaceObserver(
              props.coords.yourTeamFirstNameFontFamily
            );
            font.load().then(() => {
              const firstName = new fabric.Text(firstTeamName, {
                selectable: false,
                originX: props.coords.opponentFirstNameOriginX,
                originY: props.coords.opponentFirstNameOriginY,
                top: props.coords.opponentFirstNameTop,
                left: props.coords.opponentFirstNameLeft,
                width: props.coords.opponentFirstNameWidth,
                fill: props.coords.opponentFirstNameFill,
                fontFamily: props.coords.opponentFirstNameFontFamily,
                className: "yourFirstName",
              });
              if (props.coords.opponentFirstNameScaleToWidth) {
                firstName.scaleToWidth(
                  props.coords.opponentFirstNameScaleToWidth
                );
              }
              if (props.coords.opponentFirstNameScaleToHeight) {
                firstName.scaleToHeight(
                  props.coords.opponentFirstNameScaleToHeight
                );
              }

              if (firstName.width > props.coords.opponentFirstNameWidth) {
                firstName.scaleToWidth(
                  props.coords.opponentFirstNameScaleToWidth
                );
              }
              if (props.themeOption) {
                if (
                  props.themeOption.label.split("-")[0] === "biało" ||
                  props.themeOption.label.split("-")[0] === "żółto" ||
                  props.themeOption.label === "biały"
                ) {
                  firstName.set({
                    fill: "black",
                  });
                }
              }
              fabricRef.current.add(firstName);
            });
            const secondFont = new FontFaceObserver(
              props.coords.yourTeamSecondNameFontFamily
            );
            secondFont.load().then(() => {
              const secondName = new fabric.Text(secondTeamName, {
                selectable: false,
                originX: props.coords.opponentSecondNameOriginX,
                originY: props.coords.opponentSecondNameOriginY,
                top: props.coords.opponentSecondNameTop,
                width: props.coords.opponentSecondNameWidth,
                left: props.coords.opponentSecondNameLeft,
                fill: props.coords.opponentSecondNameFill,
                fontFamily: props.coords.opponentSecondNameFontFamily,
                className: "yourSecondName",
              });
              secondName.scaleToHeight(
                props.coords.opponentSecondNameScaleToHeight
              );
              if (secondName.width > props.coords.opponentSecondNameWidth) {
                secondName.scaleToWidth(
                  props.coords.opponentSecondNameScaleToWidth
                );
              }
              if (props.themeOption) {
                if (
                  props.themeOption.label.split("-")[0] === "biało" ||
                  props.themeOption.label.split("-")[0] === "żółto" ||
                  props.themeOption.label === "biały"
                ) {
                  secondName.set({
                    fill: "black",
                  });
                }
              }

              fabricRef.current.add(secondName);
            });
          } else {
            const font = new FontFaceObserver(
              props.coords.yourTeamNameFontFamily
            );
            font.load().then(() => {
              const name = new fabric.Text(yourTeamName, {
                selectable: false,
                originX: props.coords.opponentNameOriginX,
                originY: props.coords.opponentNameOriginY,
                top: props.coords.opponentNameTop,
                left: props.coords.opponentNameLeft,
                fill: props.coords.opponentNameFill,
                fontFamily: props.coords.opponentNameFontFamily,
                className: "yourName",
              });
              if (props.coords.yourTeamNameCharSpacing) {
                name.charSpacing = props.coords.yourTeamNameCharSpacing;
              }
              if (props.coords.yourTeamNameWidth) {
                name.width = props.coords.yourTeamNameWidth;
              }

              name.scaleToWidth(props.coords.yourTeamNameScaleToWidth);
              if (props.themeOption) {
                if (
                  props.themeOption.label.split("-")[0] === "biało" ||
                  props.themeOption.label.split("-")[0] === "żółto" ||
                  props.themeOption.label === "biały"
                ) {
                  name.set({
                    fill: "black",
                  });
                }
                if (
                  poster === "FkbRjeu4p2PvRryL8byB" ||
                  props.themeOption.label === "żółto-czarny"
                ) {
                  name.set({
                    fill: "white",
                  });
                }
                if (
                  props.id.theme === "motyw 5" &&
                  (props.themeOption.label === "żółto-czarny" ||
                    props.themeOption.label === "biało-niebieski")
                ) {
                  name.set({
                    fill: "white",
                  });
                }
              }
              fabricRef.current.add(name);
            });
          }
        }
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      teamName();
    }, [100]);
  }, [props.radioChecked, props.themeOption, props.posterBackGround]);

  useEffect(() => {
    opponentLogo();
  }, [
    props.radioChecked,
    props.themeOption,
    props.opponent,
    props.posterBackGround,
  ]);

  useEffect(() => {
    opponentsName();
  }, [
    props.radioChecked,
    props.themeOption,
    props.opponentName,
    props.posterBackGround,
  ]);

  typeDate();

  typePlace();

  yourResult();

  opponentResult();

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

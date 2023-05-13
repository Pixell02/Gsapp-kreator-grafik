import React from 'react'
import { fabric } from "fabric";

export default function hostLogo(fabricRef, props, loops) {
  
  if (props.selectHostLogoValues && props.coords.yourTeamLogoOne && loops) {
    if (loops) {
      loops.forEach((loop, i) => {
        if (props.radioValues[i] === "radio1") {
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "opponent") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          const secondImg = new Image();
          secondImg.src = props.selectHostLogoValues[i];
          secondImg.onload = () => {
            if (props.coords.datatype === "vertical") {
              fabric.Image.fromURL(secondImg.src, function (img) {
                img.set({
                  selectable: false,
                  top: props.coords.yourTeamLogoOne.Top,
                  left: props.coords.yourTeamLogoOne.Left + i * props.coords.yourTeamLogoOne.Margin,
                  originX: "center",
                  originY: "center",
                  className: "opponent",
                });
              
                img.scaleToHeight(props.coords.yourTeamLogoOne.ScaleToHeight);

                fabricRef.current.add(img);
              
              });
            } else {
              fabric.Image.fromURL(secondImg.src, function (img) {
                img.set({
                  selectable: false,
                  top: props.coords.yourTeamLogoOne.Top + i * props.coords.yourTeamLogoOne.Margin,
                  left: props.coords.yourTeamLogoOne.Left ,
                  originX: "center",
                  originY: "center",
                  className: "opponent",
                });
              
                img.scaleToHeight(props.coords.yourTeamLogoOne.ScaleToHeight);

                fabricRef.current.add(img);
              
              });
            }
          };
        } else {
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "opponent") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          const secondImg = new Image();
          secondImg.src = props.selectHostLogoValues[i];
          secondImg.onload = () => {
            fabric.Image.fromURL(secondImg.src, function (img) {
              img.set({
                selectable: false,
                top: props.coords.opponentImageOne.Top,
                left: props.coords.opponentImageOne.Left + i * props.coords.yourTeamLogo.Margin,
                originX: "center",
                originY: "center",
                className: "opponent",
              });
              img.scaleToHeight(props.coords.opponentImageOne.ScaleToHeight);
              fabricRef.current.add(img);
              fabricRef.current.renderAll();
            });
          };
        }
      });
    }
  }

}

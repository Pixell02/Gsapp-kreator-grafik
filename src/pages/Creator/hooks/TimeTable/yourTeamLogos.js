import React from 'react'
import { fabric } from 'fabric';

export default function yourTeamLogos(fabricRef, props, loops) {
  console.log(props)
  if (props.yourTeamImage && props.coords.yourTeamLogoOne && loops) {
    if (loops) {
      
      loops.forEach((loop, i) => {
        if (props.radioValues[i] === "radio1") {
          
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
                top: props.coords.yourTeamLogoOne.Top,
                left: props.coords.yourTeamLogoOne.Left + i * props.coords.yourTeamLogoOne.Margin,
                originX: "center",
                originY: "center",
                className: "teamLogo",
              });
              img.scaleToHeight(props.coords.yourTeamLogoOne.ScaleToHeight);
              console.log(img)
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
                top: props.coords.opponentImageOne.Top,
                left: props.coords.opponentImageOne.Left + i * props.coords.yourTeamLogoOne.Margin,
                originX: "center",
                originY: "center",
                className: "teamLogo",
              });
              img.scaleToHeight(props.coords.opponentImageOne.ScaleToHeight);
              fabricRef.current.add(img);
              fabricRef.current.renderAll();
            });
          };
        }
      })
    
    }
  }

}

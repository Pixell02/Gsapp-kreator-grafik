import React from "react";
import { fabric } from "fabric";

const playerImage = (fabricRef, playerImage, coords, setImageRef) => {
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "playerImage") {
      fabricRef.current.remove(fabricRef.current.item(i));
      fabricRef.current.renderAll();
    }
  });
  const img = new Image();
  img.src = playerImage;
  img.onload = () => {
    const fabricImage = new fabric.Image(img, {
      selectable: true,
      top: coords.Top,
      left: coords.Left,
      originX: "center",
      originY: "top",
      angle: coords.Angle || 0,
      className: "playerImage",
    });

    fabricImage.scaleToWidth(coords.ScaleToWidth);

    fabricRef.current.add(fabricImage);
    setImageRef(fabricImage);
    fabricImage.moveTo(2)

    fabricRef.current.renderAll();
  };
};

export default playerImage;

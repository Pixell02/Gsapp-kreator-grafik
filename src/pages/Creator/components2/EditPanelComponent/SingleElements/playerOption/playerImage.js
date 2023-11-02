import { fabric } from "fabric";

const playerImage = (fabricRef, playerImage, coords, setImageRef, height) => {
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

    fabricImage.scaleToHeight(coords.Height);
    if (fabricRef.current.getObjects().find((item) => item.className === "additionalLayer")) {
      fabricImage.moveTo(2);
      console.log(fabricRef.current.getObjects());
    } else {
      fabricImage.moveTo(0);
    }
    fabricRef.current.add(fabricImage);
    setImageRef(fabricImage);

    fabricRef.current.renderAll();
  };
};

export default playerImage;

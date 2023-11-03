import { fabric } from "fabric";

const playerImage = (fabricRef, playerImage, coords, setImageRef, height, i) => {
  fabricRef.current?._objects.forEach((image) => {
    
    if (image.className === "playerImage" + i) {
      fabricRef.current.remove(image);
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
      className: "playerImage" + i,
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

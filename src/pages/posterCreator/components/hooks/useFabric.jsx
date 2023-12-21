import { fabric } from "fabric";
import useBackgroundContext from "./useBackgroundContext";
import { useImageRefContext } from "../../../Creator/context/ImageRefContext";

const useFabric = () => {
  const { setColor } = useBackgroundContext();
  const { imageRef } = useImageRefContext();
  const initFabric = (fabricRef, img) => {
    fabricRef.current = new fabric.Canvas("canvas", {
      width: img.width,
      height: img.height,
    });
    fabricRef.current.renderAll();
    const backgroundImage = fabricRef.current.getObjects().find((item) => item.className === "background0");

    if (backgroundImage) {
      backgroundImage.setSrc(img.src, () => {
        fabricRef.current.renderAll();
      });
    } else {
      if (fabricRef.current?._objects) {
        fabric.Image.fromURL(img.src, function (img) {
          img.set({
            selectable: false,
            className: "background0",
          });
          fabricRef.current.add(img);
          fabricRef.current.renderAll();
          imageRef.current = img;
        });
      }
    }
    setColor(img.color);
    return { fabricRef };
  };

  return { initFabric };
};

export default useFabric;

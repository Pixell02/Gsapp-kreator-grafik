import { fabric } from "fabric";
import { useImageRefContext } from "../../../Creator/context/ImageRefContext";
import { useBackgroundContext } from "../../Context/BackgroundContext";
import { FabricReference } from "../../../../types/creatorComponentsTypes";
import { Image } from "fabric/fabric-impl";

const useFabric = () => {
  const { setColor } = useBackgroundContext();
  const { imageRef } = useImageRefContext();
  const initFabric = (
    fabricRef: FabricReference,
    img: { color: string; width: number; height: number; src: string }
  ) => {
    fabricRef.current = new fabric.Canvas("canvas", {
      width: img.width,
      height: img.height,
    });
    fabricRef.current.renderAll();
    const backgroundImage = fabricRef.current.getObjects().find((item) => item.className === "background0") as Image;

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

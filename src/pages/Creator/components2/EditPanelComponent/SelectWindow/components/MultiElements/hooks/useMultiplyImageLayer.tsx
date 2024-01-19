import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image as fabricImage } from "fabric/fabric-impl";
import { fabric } from "fabric";
import { Properties } from "./useProperties";

const useMultiplyImageLayer = (
  coords: DocumentData,
  selectedMatch: number,
  properties: Properties,
  fabricRef?: React.MutableRefObject<fabric.Canvas>
) => {
  const [imageObject, setImageObject] = useState<fabricImage | null>(null);

  const [image, setImage] = useState<string | ArrayBuffer>("");
  useEffect(() => {
    if (!imageObject && coords && image !== "" && properties) {
      const newImage = new Image();
      newImage.src = image as string;
      newImage.onload = () => {
        fabric.Image.fromURL(image as string, function (img) {
          img.set({
            selectable: false,
            top:
              properties.orientation === "vertically"
                ? coords.Top + (selectedMatch - 1) * properties.Margin
                : coords.Top,
            left:
              properties.orientation === "horizontally"
                ? coords.Left + (selectedMatch - 1) * properties.Margin
                : coords.Left,
            originX: "center",
            originY: "center",
            scaleX: coords.ScaleToWidth / newImage.width,
            scaleY: coords.ScaleToWidth / newImage.width,
            angle: coords.Angle,
          });
          fabricRef?.current.add(img);
          fabricRef?.current.renderAll();
          setImageObject(img);
        });
      };
    }
    if (imageObject) {
      const newImage = new Image();
      newImage.src = image as string;
      newImage.onload = () => {
        imageObject.setSrc(image as string, (img: fabricImage) => {
          img.set({
            scaleX: coords.ScaleToWidth / newImage.width,
            scaleY: coords.ScaleToWidth / newImage.width,
          });
          fabricRef?.current.renderAll();
        });
      };
    }
    if (imageObject && image === "") {
      fabricRef?.current.remove(imageObject);
      setImageObject(null);
    }
  }, [image]);
  return { setImage, imageObject };
};

export default useMultiplyImageLayer;

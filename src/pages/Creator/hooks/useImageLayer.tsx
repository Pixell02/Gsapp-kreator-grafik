import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import { Image as fabricImage } from "fabric/fabric-impl";

type ImageProps = {
  Top: number;
  Left: number;
  Angle?: number;
  ScaleToWidth: number;
  ScaleToHeight: number;
};

const useImageLayer = (coords: ImageProps, fabricRef?: React.MutableRefObject<fabric.Canvas>) => {
  const [imageObject, setImageObject] = useState<fabricImage | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer>("");
  useEffect(() => {
    if (!imageObject) {
      const newImage = new Image();
      newImage.src = image as string;
      newImage.onload = () => {
        fabric.Image.fromURL(image as string, function (img) {
          img.set({
            selectable: false,
            top: coords.Top,
            left: coords.Left,
            originX: "center",
            originY: "center",
            angle: coords.Angle || 0,
            scaleX: coords.ScaleToWidth / newImage.width,
            scaleY: coords.ScaleToWidth / newImage.width,
          });
          setImageObject(img);
          fabricRef?.current.add(img);
        });
      };
    } else if (imageObject) {
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
    fabricRef?.current.renderAll();
  }, [image]);

  return { imageObject, setImageObject, setImage };
};

export default useImageLayer;

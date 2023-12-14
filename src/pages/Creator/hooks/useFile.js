import imageCompression from "browser-image-compression";
import { fabric } from "fabric";
import { useEffect, useState } from "react";
import useImageFilters from "./useImageFilters";
import useThemeContext from "./useThemeContext";
const useFile = (fabricRef, coords, filters) => {
  const { activeFilters } = useImageFilters(filters);
  const { themeColor } = useThemeContext();
  const [isImage, setIsImage] = useState(false);
  const [fabricImageRef, setFabricImageRef] = useState(null);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const compressedImage = await compressImage(file);
        const fabricImage = new fabric.Image(compressedImage, {
          filters: activeFilters,
          top: coords.Top,
          left: coords.Left,
          originX: coords.OriginX,
          originY: coords.OriginY,
          className: coords.className,
          type: coords.type,
        });
        setIsImage(fabricImage);
        fabricImage.scaleToHeight(coords.ScaleToHeight);
        fabricRef.current.add(fabricImage);
        fabricRef.current.sendToBack(fabricImage);
        setFabricImageRef(fabricImage);
      } catch (error) {
        console.error("Error compressing or adding image:", error);
      }
    }
  };

  useEffect(() => {
    if (!fabricRef.current?._objects) return;
    const ImagesObjects = fabricRef.current.getObjects().filter((option) => option.className === coords.className);
    if (ImagesObjects.length === 0) return;
    const ImageObject = ImagesObjects[0];
    const blendColor = coords.filters.blendColor;
    const selectedColor = coords.filters.blendColor.themeOption.find((option) => option.label === themeColor.label);
    if (!selectedColor) return;
    const blendColorFilter = new fabric.Image.filters.BlendColor({
      alpha: blendColor.alpha,
      blendMode: blendColor.blendMode,
      color: selectedColor.color,
    });
    ImageObject.applyFilters([blendColorFilter]);
    fabricRef.current.renderAll();
  }, [themeColor, coords, fabricRef]);

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return await convertBlobToImage(compressedFile);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteImage = () => {
    fabricRef.current.remove(fabricImageRef);
    setIsImage(false);
  };

  const convertBlobToImage = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          resolve(image);
        };
      };
      reader.readAsDataURL(blob);
    });
  };
  return { handleFileChange, isImage, fabricImageRef, handleDeleteImage };
};

export default useFile;

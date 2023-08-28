import React, { useRef, useState } from 'react';
import { fabric } from "fabric";
import imageCompression from "browser-image-compression";
import useImageFilters from './useImageFilters';
const useFile = (fabricRef, coords, filters) => {

  const imageRef = useRef(null)
  const { activeFilters } = useImageFilters(filters);
  const [isImage, setIsImage] = useState(false);
  const [fabricImageRef, setFabricImageRef] = useState(null);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
  
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        
        const fabricImage = new fabric.Image(compressedImage, {
          className: "background",
          filters: activeFilters,
          top: coords.Top,
          left: coords.Left,
          originX: coords.OriginX,
          originY: coords.OriginY
        });
        setIsImage(fabricImage);
        
        fabricRef.current.add(fabricImage);
        fabricRef.current.sendToBack(fabricImage);
        imageRef.current = fabricImage;
        setFabricImageRef(fabricImage);
      } catch (error) {
        console.error("Error compressing or adding image:", error);
      }
    }
  };
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.8, // Adjust the maximum size as needed
      maxWidthOrHeight: 600, // Define maximum width or height for the compressed image
      useWebWorker: true
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
  }
  
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
  return {handleFileChange, isImage, fabricImageRef, handleDeleteImage}
}

export default useFile

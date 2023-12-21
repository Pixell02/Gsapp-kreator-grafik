import { useRef } from "react";
import useBackgroundContext from "./useBackgroundContext";

export const useAddBackground = () => {
  const { image, setImage } = useBackgroundContext();
  const fileInputRef = useRef(null);
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleAddBackground = (file) => {
    if (file) {
      setImage((prev) => ({
        ...prev,
        file,
        color: file.name.split(".")[0],
        src: URL.createObjectURL(file),
      }));
    }
  };

  return { handleAddBackground, onButtonClick, fileInputRef, image };
};

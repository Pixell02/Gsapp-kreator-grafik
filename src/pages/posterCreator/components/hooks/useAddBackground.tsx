import { ChangeEvent, useRef } from "react";
import { newBackground, useBackgroundContext } from "../../Context/BackgroundContext";

export const useAddBackground = () => {
  const { image, setImage } = useBackgroundContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddBackground = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    const file = files[0];
    if (file) {
      setImage(
        (prev) =>
          ({
            ...prev,
            file,
            color: file.name.split(".")[0],
            src: URL.createObjectURL(file),
          } as newBackground)
      );
    }
  };

  return { handleAddBackground, onButtonClick, fileInputRef, image };
};

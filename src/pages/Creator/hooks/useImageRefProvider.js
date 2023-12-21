import { useContext } from "react";
import { ImageRefContext } from "../context/ImageRefContext";

const useImageRefProvider = () => {
  const context = useContext(ImageRefContext);

  if (!context) {
    throw Error("ImageContext");
  }

  return context;
};

export default useImageRefProvider;

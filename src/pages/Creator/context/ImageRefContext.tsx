import { fabric } from "fabric";
import React, { PropsWithChildren, createContext, useContext, useRef } from "react";

interface ImageRefContextValue {
  imageRef: React.MutableRefObject<fabric.Image | null>;
}

export const ImageRefContext = createContext<ImageRefContextValue | null>(null);

export const ImageRefProvider: React.FC = ({ children }: PropsWithChildren) => {
  const imageRef = useRef<fabric.Image | null>(null);
  return <ImageRefContext.Provider value={{ imageRef }}>{children}</ImageRefContext.Provider>;
};

export const useImageRefContext = () => {
  const context = useContext(ImageRefContext);

  if (!context) {
    throw new Error("ImageRefContext is not provided");
  }

  return context;
};

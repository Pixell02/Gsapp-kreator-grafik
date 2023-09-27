import { useContext } from "react";
import { FontSizeContext } from "../../../../../../context/FontSizeContext";

const useFontSizeContext = () => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw Error("fontSizeContext");
  }

  return context;
};

export default useFontSizeContext;

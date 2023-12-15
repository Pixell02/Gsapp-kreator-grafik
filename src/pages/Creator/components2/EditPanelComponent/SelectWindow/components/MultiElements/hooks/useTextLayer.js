import { useEffect, useState } from "react";
import useAddMultiplyImageAndText from "./useAddMultiplyImageAndText";

const useTextLayer = (fabricRef, coords, properties, selectedMatch) => {
  const [textValue, setTextValue] = useState("");
  const { handleAddText } = useAddMultiplyImageAndText(
    fabricRef,
    selectedMatch,
    properties
  );
  useEffect(() => {
    if (textValue !== "") handleAddText(coords, textValue, properties);
  }, [textValue]);

  return { textValue, setTextValue };
};

export default useTextLayer;

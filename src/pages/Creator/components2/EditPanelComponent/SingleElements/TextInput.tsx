import React from "react";
import useTextLayer, { coordsProps } from "./hooks/useTextLayer";

type props = {
  coords: coordsProps;
  fabricRef: React.MutableRefObject<fabric.Canvas>;
};

const TextInput = ({ coords, fabricRef }: props) => {
  const { textValue, setTextValue } = useTextLayer(fabricRef, coords);

  return (
    <div>
      <label>{coords.className}</label>
      <input type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
    </div>
  );
};

export default TextInput;

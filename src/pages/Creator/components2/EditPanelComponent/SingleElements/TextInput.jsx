import React from "react";
import useTextLayer from "./hooks/useTextLayer";

const TextInput = ({ coords, fabricRef}) => {
  const { textValue, setTextValue } = useTextLayer(fabricRef, coords);

  return (
    <div>
      <label>{coords.className}</label>
      <input type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
    </div>
  );
};

export default TextInput;

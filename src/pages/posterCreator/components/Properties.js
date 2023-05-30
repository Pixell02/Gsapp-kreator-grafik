import React from "react";

import ImageProperties from "./components2/ImagePropeties";
import MultiplyProperties from "./components2/MultiplyProperties";

import TextboxProperties from "./components2/TextboxProperties";
import TextProperties from "./components2/TextProperties";

import useActiveObjectCoords from "./hooks/useActiveObject";

export default function Properties({ fabricRef }) {
  const { coords, canvasRef, setCoords, handleInputChange, handleSelectChange, updateActiveGroupObjectCoords, handleSelectGroupChange } = useActiveObjectCoords(fabricRef);
  
  return (
    <div className="overflow-scroll d-flex h-75">
      {coords.type === "image" && (
        <ImageProperties coords={coords} handleSelectChange={handleSelectChange} handleInputChange={handleInputChange} />
      )}
      {coords.type === "text" && (
        <TextProperties coords={coords} canvasRef={canvasRef} setCoords={setCoords} handleSelectChange={handleSelectChange} handleInputChange={handleInputChange} />
      )}
      
      {coords.type === "textBox" && (
        <TextboxProperties setCoords={setCoords} handleSelectGroupChange={handleSelectGroupChange} coords={coords} handleSelectChange={handleSelectChange} handleInputChange={handleInputChange} />
      )}
      {coords.type === "multiply" && (
        <MultiplyProperties handleSelectGroupChange={handleSelectGroupChange} updateActiveGroupObjectCoords={updateActiveGroupObjectCoords} coords={coords} handleSelectChange={handleSelectChange} handleInputChange={handleInputChange}  />
      )}
     
    </div>
  );
}

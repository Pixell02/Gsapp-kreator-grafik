import React from "react";

import ImageProperties from "./components2/ImagePropeties";
import MultiplyProperties from "./components2/MultiplyProperties";

import TextboxProperties from "./components2/TextboxProperties";
import TextProperties from "./components2/TextProperties";

import useActiveObjectCoords from "./hooks/useActiveObject";

export default function Properties({ fabricRef }) {
  const { coords, handleInputChange, handleSelectChange, updateActiveGroupObjectCoords, handleSelectGroupChange } = useActiveObjectCoords(fabricRef);
  
  return (
    <div className="overflow-auto">
      {coords.type === "image" && (
        <ImageProperties coords={coords} handleSelectChange={handleSelectChange} handleInputChange={handleInputChange} />
      )}
      {coords.type === "text" && (
        <TextProperties coords={coords} handleSelectChange={handleSelectChange} handleInputChange={handleInputChange} />
      )}
      
      {coords.type === "textBox" && (
        <TextboxProperties coords={coords} handleSelectChange={handleSelectChange} handleInputChange={handleInputChange} />
      )}
      {coords.type === "multiply" && (
        <MultiplyProperties handleSelectGroupChange={handleSelectGroupChange} updateActiveGroupObjectCoords={updateActiveGroupObjectCoords} coords={coords} handleSelectChange={handleSelectChange} handleInputChange={handleInputChange}  />
      )}
     
    </div>
  );
}

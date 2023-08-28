import React from "react";
import ImageProperties from "./components2/ImagePropeties";
import MultiplyProperties from "./components2/MultiplyProperties";
import TextboxProperties from "./components2/TextboxProperties";
import TextProperties from "./components2/TextProperties";
import useActiveObjectCoords from "./hooks/useActiveObject";
import PlayerNameProperties from "./components2/PlayerNameProperties";
import TextUniversalProperties from "./components2/TextUniversalProperties";
import TextBoxUniversalProperties from "./components2/TextBoxUniversalProperties";
import ImageFilterProperties from "./components2/ImageFilterProperties";
import { ImageFiltersProvider } from "../Context/ImageFiltersContext";

export default function Properties({ fabricRef }) {
  const {
    coords,
    setCoords,
    handleInputChange,
    handleSelectChange,
    updateActiveGroupObjectCoords,
    handleSelectGroupChange,
  } = useActiveObjectCoords(fabricRef);
  return (
   
    <div className="overflow-scroll d-flex h-100">
      <ImageFiltersProvider>
      {(coords.type === "image" || coords.type === "multiplyimage") && (
        <ImageProperties
          coords={coords}
          handleSelectChange={handleSelectChange}
          handleInputChange={handleInputChange}
        />
      )}
      {coords.type === "FilteredImage" && (
        <ImageFilterProperties
          coords={coords}
          handleInputChange={handleInputChange}
          fabricRef={fabricRef}
        />
      )}
      {(coords.type === "text" || coords.type === "multiplyText") && (
        <TextProperties
          coords={coords}
          canvasRef={fabricRef}
          setCoords={setCoords}
          handleSelectChange={handleSelectChange}
          handleInputChange={handleInputChange}
        />
      )}

      {coords.type === "textBox" && (
        <TextboxProperties
          setCoords={setCoords}
          handleSelectGroupChange={handleSelectGroupChange}
          coords={coords}
          handleSelectChange={handleSelectChange}
          handleInputChange={handleInputChange}
        />
      )}
      {coords.type === "multiply" && (
        <MultiplyProperties
          handleSelectGroupChange={handleSelectGroupChange}
          updateActiveGroupObjectCoords={updateActiveGroupObjectCoords}
          coords={coords}
          handleSelectChange={handleSelectChange}
          handleInputChange={handleInputChange}
        />
      )}
      {coords.type === "playerGoal" && (
        <PlayerNameProperties
          coords={coords}
          canvasRef={fabricRef}
          setCoords={setCoords}
          handleSelectChange={handleSelectChange}
          handleInputChange={handleInputChange}
        />
      )}
      {(coords.type === "universalText" || coords.type === "multiplyUniversalText" || coords.type === "multiplyUniversalNumber") &&
        <TextUniversalProperties
          coords={coords}
          canvasRef={fabricRef}
          setCoords={setCoords}
          handleSelectChange={handleSelectChange}
          handleInputChange={handleInputChange}
      />
      }
      {coords.type === "universalTextBox" &&
        <TextBoxUniversalProperties
        coords={coords}
          canvasRef={fabricRef}
          setCoords={setCoords}
          handleSelectChange={handleSelectChange}
          handleInputChange={handleInputChange}
          />}
      </ImageFiltersProvider>
      </div>
   
  );
}

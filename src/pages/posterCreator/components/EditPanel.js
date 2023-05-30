import React from "react";
import "../WorkSpace.css";
import { useAddBackground } from "./hooks/useAddBackground";
import Layers from "./Layers";
import Properties from "./Properties";
export default function EditPanel({ fabricRef, setIsOpen }) {
  const { handleAddBackground, onButtonClick, fileInputRef } = useAddBackground();
  
  return (
    <div className=" mt-3 h-100 w-100 z-index-100">
      <div className="w-100 d-flex justify-content-around">
        <button onClick={onButtonClick} className="btn ml-5">
          Dodaj tło
        </button>
        <button onClick={setIsOpen} className="btn ">
          Zapisz
        </button>

        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image"
          onChange={(e) => {
            handleAddBackground(e.target.files[0]);
          }}
        />
      </div>

      <div className="add-properties-container ml-5 pt-2">
        <p>Właściwości</p>
        <Properties fabricRef={fabricRef} />
      </div>
      <div className="add-layers-container ml-5">
        <p>Warstwy</p>
        <Layers fabricRef={fabricRef} />
      </div>
    </div>
  );
}

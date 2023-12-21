import React from "react";
import "../WorkSpace.css";
import { useAddBackground } from "./hooks/useAddBackground";
import { useMultiPropertiesContext } from "./hooks/useMultiPropertiesContext";
import Layers from "./Layers";
import Properties from "./Properties";
import MultiProperties from "./MultiProperties";
export default function EditPanel({ fabricRef, setIsOpen }) {
  const { handleAddBackground, onButtonClick, fileInputRef } = useAddBackground(fabricRef);

  const { isMany } = useMultiPropertiesContext();
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
      {isMany && (
        <div className="ml-5 mt-5">
          <p>Właściwości wielo meczowe</p>
          <MultiProperties fabricRef={fabricRef} />
        </div>
      )}

      <div className="add-layers-container ml-5 mt-5">
        <p>Warstwy</p>
        <Layers fabricRef={fabricRef} />
      </div>
    </div>
  );
}

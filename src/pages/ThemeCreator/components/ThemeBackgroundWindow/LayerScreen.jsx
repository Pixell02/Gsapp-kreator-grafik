import React from "react";
import useFabricObjects from "../../hooks/useFabricObjects";

const LayerScreen = ({ fabricRef }) => {
  const { objects } = useFabricObjects(fabricRef);

  return (
    <div className="d-flex w-100 flex-column">
      {objects?.reverse().map((layer, i) => (
        <div draggable className="d-flex flex-row w-100 pt-2 pb-2 border" key={i}>
          <div className="d-flex w-100 align-items-center justify-content-center">
            <span style={{ color: "black" }}>{layer.className}</span>
          </div>
          <div className="d-flex w-25">
            <button
              onClick={() => fabricRef.current.remove(layer)}
              className="btn"
            >
              Usuń
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LayerScreen;

import React, { useState } from "react";
import useFabricObjects from "../../hooks/useFabricObjects";

const LayerScreen = ({ fabricRef }) => {

  const { objects } = useFabricObjects(fabricRef);
  console.log(objects)

  return (
    <div>
      {objects?.reverse()
        .map((layer, i) => (
          <div className="d-flex flex-column" key={i}>
            <div className="d-flex">
              <span>{layer.type}</span>
            </div>
            <div>
              <p style={{ color: "black" }}>{layer.className}</p>
            </div>
            <div>
              <button onClick={() => fabricRef.current.remove(layer)} className="btn">Usuń</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LayerScreen;

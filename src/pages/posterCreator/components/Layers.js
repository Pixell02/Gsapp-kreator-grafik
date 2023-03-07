import React from "react";

const layersName = [
  { name: "herb gospodarza" },
  { name: "herb przeciwnika" },
  { name: "pierwsza część nazwy gospodarza" },
  { name: "druga część nazwy gospodarza" },
  { name: "pełna nazwa gospodarza" },
  { name: "pierwsza część nazwy przeciwnika" },
  { name: "druga część nazwy przeciwnika" },
  { name: "pełna nazwa przeciwnika" },
  { name: "skład meczowy" },
  { name: "rezerwowi" },
  { name: "gole gospodarza" },
  { name: "gole przeciwnika" },
  { name: "klasa" },
  { name: "kolejka" },
  { name: "miejsce" },
  { name: "data i godzina" },
];

export default function Layers() {
  return (
    <div className="layers">
      {layersName &&
        layersName.map((layer) => (
          <div className="layer-container">
            <div className="add-name-container">{layer.name}</div>
            <div className="add-layer-btn-container">
              <button className="btn rounded">+</button>
            </div>
          </div>
        ))}
    </div>
  );
}

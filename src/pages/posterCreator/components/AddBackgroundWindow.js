import React, { useState } from 'react';
import { useContext } from 'react';
import Draggable from 'react-draggable';
import { ManyBackgroundsContext } from '../Context/ManyBackgroundsContext';

export default function AddBackgroundWindow({backgrounds}) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [defaultBackgrounds, setDefaultBackGroundColor] = useState( backgrounds ? Array.from( backgrounds)  : null);
  
  const { manyBackgrounds, setManyBackgrounds } = useContext(ManyBackgroundsContext)
  function handleFileUpload(e) {
    const files = e.target.files;
    const fileList = Array.from(files);
    setManyBackgrounds([...manyBackgrounds, ...fileList])
  }
  
  function handleDrag(e, ui) {
    const { x, y } = ui;
    setPosition({ x, y });
  }

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={position}
      position={position}
      grid={[3, 1]}
      scale={1}
      onDrag={handleDrag}
    >
      <div className="window">
        <div className="handle d-flex flex-row">
          <div className='d-flex align-items-center'>tła</div>
          <div className='w-100 d-flex justify-content-end'>
            <label htmlFor="file-input" className="file-input-label">
              Dodaj tła
            </label>
            <input
              id="file-input"
              type="file"
              multiple
              onChange={handleFileUpload}
              className="file-input"
            />
          </div>
        </div>
        <div className="content w-100 d-flex flex-column justify-content-center overflow-scroll">
          {defaultBackgrounds && defaultBackgrounds.map((image) => (
            <div className='d-flex w-100 flex-row h-100'>
              <div className='w-25'><img src={image.src} style={{maxWidth: "20px"}} /></div>
              {image.color}
            </div>
          ))}
          {manyBackgrounds && manyBackgrounds.map((image) => (
            <div className='d-flex w-100 flex-column'>
              <div> {image.color}</div>
            </div>
          ))}
        </div>
      </div>
    </Draggable>
  );
}
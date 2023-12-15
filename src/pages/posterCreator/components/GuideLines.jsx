import React from 'react'
import { useState } from 'react';
import Draggable from 'react-draggable';
import "./guideLines.css"
function GuideLines() {
  const [position, setPosition] = useState({ x: 100, y: 100 });

  function handleDrag(e, ui) {
    const { x, y } = ui;
    setPosition({ x, y });
  }
  return (
    <Draggable
      axis="both"
      handle=".guideLine"
      defaultPosition={position}
      position={position}
      onDrag={handleDrag}
    >
      <div className='help-line'>
        <div className='guideLine'>
        </div>
      </div>

    </Draggable>
  )
}

export default GuideLines

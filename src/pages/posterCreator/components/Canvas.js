import React, { useRef } from 'react'

export default function Canvas(props) {
    const fabricRef = useRef();
  return (
    <canvas ref={fabricRef}></canvas>
  )
}

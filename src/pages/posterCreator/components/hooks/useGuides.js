import { useEffect, useRef, useState } from "react";


const useGuides = () => {
  const [lines, setLines] = useState([]);
  const [lineDirection, setLineDirection] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const lineRef = useRef(null);

  const handleLineDirectionChange = (event) => {
    setLineDirection(event.target.value);
  };

  const handleCreateLine = () => {
    setLines((prevLines) => [
      ...prevLines,
      { direction: lineDirection, position: { x: 0, y: 0 } }
    ]);
    setLineDirection("");
  };

  const handleMouseDown = (event, lineIndex) => {
    event.preventDefault();
    setIsDragging(true);
    const linePositionRect = lineRef.current.getBoundingClientRect();
    setDragOffset({
      x: event.clientX - linePositionRect.left,
      y: event.clientY - linePositionRect.top
    });
    setLines((prevLines) =>
      prevLines.map((line, index) => {
        if (index === lineIndex) {
          return {
            ...line,
            isDragging: true
          };
        } else {
          return line;
        }
      })
    );
  };

  const handleMouseMove = (event) => {
    event.preventDefault();
    if (!isDragging) return;
    setLines((prevLines) =>
      prevLines.map((line) => {
        if (line.isDragging) {
          return {
            ...line,
            position: {
              x: event.clientX - dragOffset.x,
              y: event.clientY - dragOffset.y
            }
          };
        } else {
          return line;
        }
      })
    );
  };

  const handleMouseUp = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setLines((prevLines) =>
      prevLines.map((line) => {
        return {
          ...line,
          isDragging: false
        };
      })
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsDragging(false);
        setLines((prevLines) =>
          prevLines.map((line) => {
            return {
              ...line,
              isDragging: false
            };
          })
        );
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    lines,
    setLines,
    lineDirection,
    setLineDirection,
    isDragging,
    setIsDragging,
    dragOffset,
    setDragOffset,
    lineRef,
    handleLineDirectionChange,
    handleCreateLine,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  };


}


export default useGuides;
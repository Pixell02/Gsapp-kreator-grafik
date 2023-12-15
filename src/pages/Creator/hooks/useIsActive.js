import { useState } from "react";

const useIsActive = (fabricRef) => {
  const [isActive, setIsActive] = useState(false);

  const handleActiveObject = (item) => {
    fabricRef.current.setActiveObject(item);
    item.opacity = 0.2;
    setIsActive(true);
    fabricRef.current.renderAll();
  };

  const handleDeActiveObject = (item) => {
    fabricRef.current.discardActiveObject();
    item.opacity = 1;
    fabricRef.current.renderAll();
    setIsActive(false);
  };

  return { isActive, handleDeActiveObject, handleActiveObject };
};

export default useIsActive;

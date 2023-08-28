import React, { useEffect, useState } from 'react';

const useIsActive = (fabricRef) => {
  const [isActive, setIsActive] = useState(false);

  const handleActiveObject = (item) => {
    fabricRef.current.setActiveObject(item);
    setIsActive(true)
    fabricRef.current.renderAll();
  }

  
  const handleDeActiveObject = () => {
      fabricRef.current.discardActiveObject();
      fabricRef.current.renderAll();
      setIsActive(false);
  };

  return { isActive, handleDeActiveObject, handleActiveObject };
};

export default useIsActive;

import { useState } from "react";

const useDefaultBackgrounds = (backgrounds) => {
  const [defaultBackgrounds, setDefaultBackgrounds] = useState(backgrounds ? Array.from(backgrounds) : null);

  const handleDefaultBackgroundChangeName = (e, i) => {
    const newName = [...defaultBackgrounds];
    const { value } = e.target;
    newName[i].color = value;
    setDefaultBackgrounds(newName);
  };

  return { defaultBackgrounds, handleDefaultBackgroundChangeName, setDefaultBackgrounds };
};

export default useDefaultBackgrounds;

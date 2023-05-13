import React from 'react'

const playerName = (fabricRef, selectedPlayerName, coords, themeOption, posterBackground) => {
  
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "yourPlayer") {
      fabricRef.current.remove(fabricRef.current.item(i));
    }
    
  });
  

}

export default playerName

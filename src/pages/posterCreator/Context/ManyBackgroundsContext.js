import React, { createContext, useState } from 'react'

export const ManyBackgroundsContext = createContext();


export function ManyBackgroundsProvider(props) {
  const [manyBackgrounds, setManyBackgrounds] = useState([]);
  return (
    <ManyBackgroundsContext.Provider value={{ manyBackgrounds, setManyBackgrounds }} >
      {props.children}
    </ManyBackgroundsContext.Provider>
  )
}

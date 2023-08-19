import { createContext, useRef } from "react";




export const ImageRefContext = createContext(null);

export const ImageRefProvider = ({ children }) => {
  
  const imageRef = useRef(null)

  return (
    <ImageRefContext.Provider value={{ imageRef }}>
      {children}
    </ImageRefContext.Provider>
  )
}
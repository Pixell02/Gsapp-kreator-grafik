import { createContext, useState } from "react";


export const MultiPropertiesContext = createContext(null);

export const MultiPropertiesProvider = ({ children }) => {
  const [isMany, setIsMany] = useState(false);
  const [properties, setProperties] = useState({
    numberOfMatches: 4,
    orientation: 'horizontally',
    Margin: 100
  })
  return (
    <MultiPropertiesContext.Provider value={{ isMany, setIsMany, properties, setProperties }}>
      {children}
    </MultiPropertiesContext.Provider>
  )
}
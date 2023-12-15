import { createContext, useState } from "react";


export const ImageFiltersContext = createContext(null);

export function ImageFiltersProvider({ children }) {
  
  const [filters, setFilters] = useState([]);

  return (
    <ImageFiltersContext.Provider value={{filters, setFilters}}>
      {children}
    </ImageFiltersContext.Provider>
  )

}
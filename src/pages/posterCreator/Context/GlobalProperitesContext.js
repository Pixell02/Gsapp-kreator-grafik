import React, { createContext, useState } from 'react';

export const GlobalPropertiesContext = createContext();

export function GlobalPropertiesProvider(props) {
  const [globalProperties, setGlobalProperties] = useState(null);

  return (
    <GlobalPropertiesContext.Provider value={{ globalProperties, setGlobalProperties }}>
      {props.children}
    </GlobalPropertiesContext.Provider>
  );
}
import React, { createContext, useState } from 'react';

export const BackgroundContext = createContext();

export function BackgroundProvider(props) {
  const [background, setBackground] = useState(null);
  const [image, setImage] = useState(null);

  return (
    <BackgroundContext.Provider value={{ background, setBackground, image, setImage }}>
      {props.children}
    </BackgroundContext.Provider>
  );
}
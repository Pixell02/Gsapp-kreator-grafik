import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebase/config';
import { useCollection } from '../../../hooks/useCollection';

export const BackgroundContext = createContext();

export function BackgroundProvider({ children }) {
  const params = useParams();
  const [image, setImage] = useState({});
  useEffect(() => {
   const docRef = doc(db, "yourCatalog", params.id)
  getDoc(docRef)
    .then((doc) => {
     setImage(doc.data())
   }) 
  },[params.id])
  
  

  const [background, setBackground] = useState([]);
  
  const [color, setColor] = useState(null);
  return (
    <BackgroundContext.Provider value={{color, setColor,  background, setBackground, image, setImage }}>
      {children}
    </BackgroundContext.Provider>
  );
}
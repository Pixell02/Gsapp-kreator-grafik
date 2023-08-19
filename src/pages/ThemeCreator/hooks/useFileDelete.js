import { deleteObject, getStorage, ref } from 'firebase/storage'
import React from 'react'
import { useContext } from 'react';
import { ManyBackgroundsContext } from '../../posterCreator/Context/ManyBackgroundsContext';
import useDefaultBackgrounds from './useDefaultBackgrounds';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { useLocation, useParams } from 'react-router-dom';

const useFileDelete = (backgrounds) => {

  const { defaultBackgrounds, setDefaultBackgrounds,  handleDefaultBackgroundChangeName } = useDefaultBackgrounds(
    backgrounds || null
  );
  console.log(defaultBackgrounds)
  const { manyBackgrounds, setManyBackgrounds } = useContext(ManyBackgroundsContext);
  const storage = getStorage();
  const location = useLocation();

  const handleDeleteFile = (item) => {
    const filteredBackgrounds = manyBackgrounds.filter((background) => background.color !== item.color)
    setManyBackgrounds(filteredBackgrounds)
  } 
  const handleDeleteLinkFile = async (item) => {
    const split = item.src.split('/')[7];
    const secondSplit = split.split('?')[0];
    const link = decodeURIComponent(secondSplit.replace("%2F", "/"));
    const imageRef = ref(storage, link);
    deleteObject(imageRef)
      .then(() => {
        console.log("deleted")
        let docRef;
    if (location.pathname.split('/')[3] === "theme") {
      docRef = doc(db, "piecesOfPoster", item.id)
    } else {
      docRef = doc(db, "yourCatalog", item.id)
    }
    deleteDoc(docRef);
        const filteredBackgrounds = defaultBackgrounds.filter((background) => background.color !== item.color);
      setDefaultBackgrounds(filteredBackgrounds)
      }).catch((err) => { 
        console.log(err)
      });
    
    
  }

  return {handleDeleteFile, handleDeleteLinkFile}
}

export default useFileDelete

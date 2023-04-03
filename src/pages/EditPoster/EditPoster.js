import React from 'react'
import { useParams } from 'react-router-dom';
import LeftBar from '../../components/Left-Bar'
import { useCollection } from '../../hooks/useCollection';
import WorkSpace from '../posterCreator/WorkSpace'
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useState } from 'react';
import { useEffect } from 'react';

export default function EditPoster() {
  
  const params = useParams();
  const [defaultBackground, setDefaultBackGround] = useState({});
  useEffect(() => {
   const docRef = doc(db, "yourCatalog", params.id)
  getDoc(docRef)
    .then((doc) => {
     setDefaultBackGround(doc.data())
   }) 
  },[])
  
  const { documents: backgrounds } = useCollection("yourCatalog", ["uuid", "==", params.id])
  console.log(backgrounds)
  const { documents: coords } = useCollection("coords",["uid", "==", params.id])
  return (
    <div className="page-container">
      <div className='content-wrap'>
        <LeftBar />
        {defaultBackground && coords && (
          <WorkSpace
            id={params.id}
            backgrounds={backgrounds}
            defaultBackGround={defaultBackground ? defaultBackground : null}
            coords={coords ? coords[0] : null} />
        )}
        
      </div>
    </div>
  )
}

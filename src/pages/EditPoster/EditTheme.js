import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/config';
import { useCollection } from '../../hooks/useCollection';

export default function EditTheme() {

  const params = useParams();
  const [defaultBackground, setDefaultBackGround] = useState({});
  const {documents: poster} = useCollection("piecesOfPoster", ["uid", "==", params.id])

  useEffect(() => {
    poster && poster[0] && (setDefaultBackGround(poster[0].src))
  },[poster])

  return (
    <div>
      
    </div>
  )
}

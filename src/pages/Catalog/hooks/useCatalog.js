


import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../../../firebase/config'
import useSelectSport from './useSelectSport'
import { LanguageContext } from '../../../context/LanguageContext'
import { TeamContext } from '../../../context/TeamContext'

const useCatalog = () => {

  const { language } = useContext(LanguageContext);
  const { selectedSportKeys } = useContext(TeamContext);

  const { data } = useSelectSport(selectedSportKeys, language)
  const [posters, setPosters] = useState(null)

  useEffect(() => {
    const fetchRelatedDocs = async () => {
      try {
        const q = query(collection(db, 'piecesOfPoster'), where('themeId', 'in', data.map(item => item.id)));
        const querySnapshot = await getDocs(q);

        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosters(documents);
      } catch (error) {
        console.error('Błąd pobierania powiązanych dokumentów z Firestore:', error);
      }
    };

    if (data?.length > 0) {
      fetchRelatedDocs();
    } else {
      setPosters([])
    }

  },[data])


  return {posters, data} 
}

export default useCatalog

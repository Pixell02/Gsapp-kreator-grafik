import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../../firebase/config';
import useSelectSport from './useSelectSport';
import { LanguageContext } from '../../../context/LanguageContext';
import { TeamContext } from '../../../context/TeamContext';

const useCatalog = () => {
  const { language } = useContext(LanguageContext);
  const { selectedSportKeys } = useContext(TeamContext);

  const { data } = useSelectSport(selectedSportKeys, language);
  const [posters, setPosters] = useState([]);
  
  useEffect(() => {
    const fetchRelatedDocs = async () => {
      try {
        const promises = data.map(async (item) => {
          const q = query(collection(db, 'piecesOfPoster'), where('themeId', '==', item.id));
          const querySnapshot = await getDocs(q);
  
          return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
        });
  
        const results = await Promise.all(promises);
        const allDocuments = [].concat(...results);
        setPosters(allDocuments);
      } catch (error) {
        console.error('Błąd pobierania powiązanych dokumentów z Firestore:', error);
      }
    };
  
    if (data?.length > 0) {
      fetchRelatedDocs();
    } else {
      setPosters([]);
    }
  }, [data]);

  return { posters, data };
};

export default useCatalog;

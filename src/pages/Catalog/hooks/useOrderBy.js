import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../../firebase/config';

const useOrderBy = (c, o) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const q = query(collection(db, c), orderBy(o));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setDocuments(data);
        setLoading(false);
      } catch (error) {
        console.error('Błąd pobierania dokumentów:', error);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [c, o]);

  return { documents, loading };


}

export default useOrderBy

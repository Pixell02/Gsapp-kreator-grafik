import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase/config';

const useSelectSport = (_q, _q2) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, 'catalog'), // Zastąp "nazwa_kolekcji" nazwą kolekcji w swojej bazie Firestore
          where('sport', '==', _q),
          where('lang', '==', _q2),
          where('public', '==', true)
        );

        const querySnapshot = await getDocs(q);

        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id, // Dodane pole id
          ...doc.data(),
        }));
        setData(documents);
      } catch (error) {
        console.error('Błąd pobierania danych z Firestore:', error);
      }
    };

    fetchData();
  }, [_q, _q2]);

  return { data };
};

export default useSelectSport;

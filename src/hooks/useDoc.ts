import { useState, useEffect } from 'react';
import { db } from '../firebase/config';

// firebase imports
import {
  CollectionReference,
  DocumentData,
  Query,
  WhereFilterOp,
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

export const useDoc = (c: string, _q: [string, WhereFilterOp, string]) => {
  const [documents, setDocuments] = useState<DocumentData | null>(null);

  useEffect(() => {
    let ref: CollectionReference | Query = collection(db, c);

    if (_q) {
      ref = query(ref, where(..._q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDocuments(results[0]);
    });

    return () => unsub();
  }, [c]);
  return { documents };
};

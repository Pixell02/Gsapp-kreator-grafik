import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";

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
} from "firebase/firestore";

export const useCollection = (c: string, _q?: [string, WhereFilterOp, string]) => {
  const [documents, setDocuments] = useState<DocumentData[] | null>(null);

  const q = useRef(_q).current;
  useEffect(() => {
    let ref: CollectionReference | Query = collection(db, c);

    if (q) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      const results: DocumentData[] = [];
      snapshot.docs.forEach((doc: DocumentData) => {
        results.push({ ...doc.data(), id: doc.id } as DocumentData);
      });

      setDocuments(results);
    });

    return () => unsub();
  }, [c]);
  return { documents };
};

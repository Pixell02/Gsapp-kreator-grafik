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

export const useCollection = <T,>(
  c: string,
  _q?: [string, WhereFilterOp, string | number],
  _q2?: [string, WhereFilterOp, string | number]
) => {
  const [documents, setDocuments] = useState<T[] | null>(null);

  const q = useRef(_q).current;
  const q2 = useRef(_q2).current;
  useEffect(() => {
    let ref: CollectionReference | Query = collection(db, c);

    if (q && q2) {
      ref = query(ref, where(...q), where(...q2));
    } else if (q) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      const results: T[] = [];
      snapshot.docs.forEach((doc: DocumentData) => {
        results.push({ ...doc.data(), id: doc.id } as T);
      });

      setDocuments(results);
    });

    return () => unsub();
  }, [c]);
  return { documents };
};

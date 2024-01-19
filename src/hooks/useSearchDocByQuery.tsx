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
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useSearchDocByQuery = (c: string, q1: string, q2: WhereFilterOp, selectedItem: DocumentData) => {
  const [document, setDocument] = useState<DocumentData[] | DocumentData | null>(null);

  useEffect(() => {
    if (!selectedItem) return;
    let ref: CollectionReference | Query = collection(db, c);

    if (q1 && q2 && selectedItem) {
      ref = query(ref, where(q1, q2, selectedItem));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      if (results.length === 1) {
        setDocument(results[0]);
      } else {
        setDocument(results);
      }
    });

    return () => unsub();
  }, [c, selectedItem]);

  return { document };
};

export default useSearchDocByQuery;

import { CollectionReference, Query, WhereFilterOp, collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

const useSearchDocsByQuery = <T,>(c: string, q1: string, Filter: WhereFilterOp, selectedItem: string) => {
  const [documents, setDocuments] = useState<T[]>([]);

  useEffect(() => {
    if (!selectedItem) return;
    let ref: CollectionReference | Query = collection(db, c);

    if (q1 && Filter && selectedItem) {
      ref = query(ref, where(q1, Filter, selectedItem));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setDocuments(results as T[]);
    });

    return () => unsub();
  }, [c, selectedItem]);

  return { documents };
};

export default useSearchDocsByQuery;

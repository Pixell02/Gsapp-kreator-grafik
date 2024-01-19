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

const useSearchDocsByQuery = (
  c: string,
  q1: string,
  Filter: WhereFilterOp,
  selectedItem: string,
  q2?: string,
  Filter2?: WhereFilterOp,
  selectedItem2?: string
) => {
  const [documents, setDocuments] = useState<DocumentData[] | null>(null);

  useEffect(() => {
    if (!selectedItem) return;
    let ref: CollectionReference | Query = collection(db, c);

    if (q1 && Filter && selectedItem) {
      ref = query(ref, where(q1, Filter, selectedItem));
    }
    if (q2 && Filter2 && selectedItem2) {
      ref = query(ref, where(q1, Filter, selectedItem), where(q2, Filter2, selectedItem2));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      setDocuments(results);
    });

    return () => unsub();
  }, [c, selectedItem, selectedItem2]);

  return { documents };
};

export default useSearchDocsByQuery;

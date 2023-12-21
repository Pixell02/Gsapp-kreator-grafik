import { DocumentData, collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Value } from "./useDate";
import { db } from "../../../firebase/config";

const usePlanedPostersCollection = (date: Value) => {
  const [documents, setDocuments] = useState<DocumentData | null>(null);

  useEffect(() => {
    const ref = query(collection(db, "calendarPoster"), where("date", "==", date));

    const unsub = onSnapshot(ref, (snapshot) => {
      const results: DocumentData[] = [];
      snapshot.docs.forEach((doc: DocumentData) => {
        results.push({ ...doc.data(), id: doc.id } as DocumentData);
      });

      setDocuments(results);
    });

    return () => unsub();
  }, [date]);

  return { documents };
};

export default usePlanedPostersCollection;

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../../firebase/config";
import { poster } from "../../../components/PosterItem";

const useOrderBy = (c: string, o: string) => {
  const [documents, setDocuments] = useState<poster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = query(collection(db, c), orderBy(o));
    const unsub = onSnapshot(ref, (snapshot) => {
      setLoading(false);
      const results: poster[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id } as poster);
      });

      setDocuments(results);
    });
    return () => unsub();
  }, [c]);

  return { documents, loading };
};

export default useOrderBy;

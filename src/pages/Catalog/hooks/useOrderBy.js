import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../../firebase/config";

const useOrderBy = (c, o) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = query(collection(db, c), orderBy(o));
    const unsub = onSnapshot(ref, (snapshot) => {
      setLoading(false);
      const results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      setDocuments(results);
    });
    return () => unsub();
  }, [c]);

  return { documents, loading };
};

export default useOrderBy;

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../../../firebase/config";

const useSortByDate = (start, end) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const ref = query(
      collection(db, "history"),
      where("date", ">=", start),
      where("date", "<=", end)
    );
    onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      setDocuments(results);
    });
  }, [start, end]);
  return { documents };
};

export default useSortByDate;

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../../../firebase/config";

const useFindTeam = (province) => {
  const [documents, setDocuments] = useState([]);
  const collectionName = "AllTeams";
  useEffect(() => {
    const ref = query(
      collection(db, collectionName),
      where("province", "==", province)
    );

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      setDocuments(results);
    });

    return () => unsub();
  }, [province, collectionName]);

  return { documents };
};

export default useFindTeam;

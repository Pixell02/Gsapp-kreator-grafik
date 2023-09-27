import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { LicenseContext } from "../context/LicenseContext";
import { db } from "../firebase/config";

const useTeamLicenseCollection = (c) => {
  const [documents, setDocuments] = useState(null);
  const { license } = useContext(LicenseContext);
  useEffect(() => {
    if (license?.team) {
      const ref = query(collection(db, c), where("uid", "==", license.team));
      onSnapshot(ref, (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
      });
    }
  }, [c, license]);

  return { documents };
};

export default useTeamLicenseCollection;

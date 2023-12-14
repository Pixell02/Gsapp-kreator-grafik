import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { LicenseContext } from "../context/LicenseContext";
import { db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

const useTeamLicenseCollection = (c) => {
  const [documents, setDocuments] = useState(null);
  const { user } = useAuthContext();
  const { license } = useContext(LicenseContext);
  useEffect(() => {
    if (user?.uid && license?.team) {
      if (user?.uid !== license?.team) {
        const ref = query(collection(db, c), where("uid", "==", license.team));
        onSnapshot(ref, (snapshot) => {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });

          setDocuments(results);
        });
      }
      }
  }, [c, license, user]);

  return { documents };
};

export default useTeamLicenseCollection;

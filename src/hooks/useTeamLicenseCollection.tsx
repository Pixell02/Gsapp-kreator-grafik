import { DocumentData, collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLicenseContext } from "../context/LicenseContext";
import { db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

const useTeamLicenseCollection = <T,>(c: string) => {
  const [documents, setDocuments] = useState<T[] | null>(null);
  const { user } = useAuthContext();
  const { license } = useLicenseContext();
  useEffect(() => {
    if (user?.uid && license?.team) {
      if (user?.uid !== license?.team) {
        const ref = query(collection(db, c), where("uid", "==", license.team));
        onSnapshot(ref, (snapshot) => {
          const results: DocumentData[] = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });

          setDocuments(results as T[]);
        });
      }
    }
  }, [c, license, user]);

  return { documents };
};

export default useTeamLicenseCollection;

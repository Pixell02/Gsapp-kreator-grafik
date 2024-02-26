import { useEffect } from "react";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useState } from "react";
import { useLicenseContext } from "../../../context/LicenseContext";
import { Graphic } from "../../../types/graphicTypes";

const useTeamPosters = () => {
  const { user } = useAuthContext();
  const { license } = useLicenseContext();
  const { documents: yourPoster } = useCollection<Graphic>("yourCatalog", ["uid", "==", user.uid]);

  const [teamPosters, setTeamPosters] = useState<Graphic[] | null>(null);
  useEffect(() => {
    if (license?.team) {
      const ref = query(collection(db, "yourCatalog"), where("uid", "==", license.team));
      onSnapshot(ref, (snapshot) => {
        const results: Graphic[] = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id } as Graphic);
        });

        setTeamPosters(results);
      });
    }
  }, [license]);

  return { yourPoster, teamPosters, license };
};

export default useTeamPosters;

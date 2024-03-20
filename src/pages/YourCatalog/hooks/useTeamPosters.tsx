import { useEffect } from "react";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useState } from "react";
import { License, useLicenseContext } from "../../../context/LicenseContext";
import { Graphic } from "../../../types/graphicTypes";
import { useParams } from "react-router-dom";

const useTeamPosters = (userLicense?: License) => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { license } = useLicenseContext();
  const { documents: yourPoster } = useCollection<Graphic>("yourCatalog", ["uid", "==", id || user.uid]);

  const [teamPosters, setTeamPosters] = useState<Graphic[] | null>(null);
  useEffect(() => {
    if (license?.team) {
      const ref = query(collection(db, "yourCatalog"), where("uid", "==", userLicense?.team || license.team));
      onSnapshot(ref, (snapshot) => {
        const results: Graphic[] = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id } as Graphic);
        });

        setTeamPosters(results);
      });
    }
  }, [license, userLicense]);

  return { yourPoster, teamPosters, license };
};

export default useTeamPosters;

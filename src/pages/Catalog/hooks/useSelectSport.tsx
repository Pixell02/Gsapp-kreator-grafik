import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import { Catalog } from "../../../types/creatorComponentsTypes";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { ThemeCode } from "./useCatalog";
import { useCollection } from "../../../hooks/useCollection";

const useSelectSport = (_q: string | null, _q2: "normal" | "story") => {
  const [data, setData] = useState<Catalog[] | null>(null);
  const { user } = useAuthContext();
  const { documents: usedCodes } = useCollection<ThemeCode>("usedThemeCode", ["uid", "==", user.uid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "catalog"),
          where("sport", "==", _q),
          where("type", "==", _q2),
          where("public", "==", true)
        );

        const querySnapshot = await getDocs(q);

        const documents = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as Catalog)
        );
        const themeWithPassword = usedCodes?.map(async (theme) => {
          const q = query(collection(db, "catalog"), where("password", "==", theme.code));
          const querySnapshot = await getDocs(q);
          return querySnapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as Catalog)
          );
        });
        const securedDocuments = await Promise.all(themeWithPassword || []);
        setData(documents.concat(securedDocuments.flat()));
      } catch (error) {
        console.error("Błąd pobierania danych z Firestore:", error);
      }
    };
    if (!_q) return;
    fetchData();
  }, [_q, _q2, usedCodes]);

  return { data };
};

export default useSelectSport;

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export type License = {
  id: string;
  license: "free-trial" | "no-license" | "admin" | "full-license";
  numberOfFreeUse?: string;
  team?: string;
  uid: string;
  expireDate?: string;
};

type ContextData = {
  license: License;
  setLicense: Dispatch<SetStateAction<License>>;
};

export const LicenseContext = createContext<ContextData | null>(null);

export const LicenseProvider = ({ children }: PropsWithChildren) => {
  const [license, setLicense] = useState<License>({
    id: "",
    license: "no-license",
    uid: "",
  });
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      const ref = query(collection(db, "user"), where("uid", "==", user.uid));

      const unsub = onSnapshot(ref, (snapshot) => {
        const results: License[] = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id } as License);
        });

        setLicense(results[0]);
      });
      return () => unsub();
    }
  }, [user]);

  return <LicenseContext.Provider value={{ license, setLicense }}>{children}</LicenseContext.Provider>;
};

export const useLicenseContext = () => {
  const context = useContext(LicenseContext);
  if (!context) {
    throw Error("licenseContext ");
  }

  return context;
};

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

export const LicenseContext = createContext();

export const LicenseProvider = ({ children }) => {
  const [license, setLicense] = useState(null);
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      let ref = collection(db, "user");
      ref = query(ref, where("uid", "==", user.uid));

      const unsub = onSnapshot(ref, (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
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

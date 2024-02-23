import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../../firebase/config";

type User = {
  name: string;
  uid: string;
  img: string;
  email: string;
  sport: string;
  license: "free-license" | "no-license" | "full-license";
};

const useSearchUser = (search: string, licenseType: string, clicked: boolean) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      if (licenseType === "") {
        if (search === "") return setUsers(null);
        const emailQuery = query(
          collection(db, "AllUsers"),
          where("email", ">=", search),
          where("email", "<=", search + "\uf8ff")
        );
        const nameQuery = query(
          collection(db, "AllUsers"),
          where("name", ">=", search),
          where("name", "<=", search + "\uf8ff")
        );
        const uidQuery = query(
          collection(db, "AllUsers"),
          where("uid", ">=", search),
          where("uid", "<=", search + "\uf8ff")
        );

        const emailSnapshot = await getDocs(emailQuery);
        const nameSnapshot = await getDocs(nameQuery);
        const uidSnapshot = await getDocs(uidQuery);

        const emailResults: User[] = emailSnapshot.docs.map((doc) => ({ ...doc.data() } as User));
        const nameResults: User[] = nameSnapshot.docs.map((doc) => ({ ...doc.data() } as User));
        const uidResults: User[] = uidSnapshot.docs.map((doc) => ({ ...doc.data() } as User));

        const mergedResults = [...emailResults, ...nameResults, ...uidResults];
        const uniqueResults = Array.from(new Set(mergedResults.map((user) => user.uid))).map((uid) => {
          return mergedResults.find((user) => user.uid === uid);
        });

        setUsers(uniqueResults as User[]);
      } else {
        const licenseQuery = query(collection(db, "AllUsers"), where("license", "==", licenseType));
        const licenseSnapshot = await getDocs(licenseQuery);
        const licenseResults: User[] = licenseSnapshot.docs.map((doc) => ({ ...doc.data() } as User));
        setUsers(licenseResults);
      }

      setLoading(false);
    };

    fetchUsers();
  }, [clicked]);

  return { users, loading };
};

export default useSearchUser;

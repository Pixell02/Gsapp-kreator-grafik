import { CollectionReference, Query, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase/config";

type Team = {
  id: string;
  email: string;
  uid: string;
};

const useSearchTeam = (q: string) => {
  const [users, setUsers] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q) {
      setLoading(true);
      let teamRef: CollectionReference | Query = collection(db, "Teams");
      teamRef = query(
        teamRef,
        where("firstName", ">=", q),
        where("firstName", "<", q + "\uf8ff"),
        orderBy("firstName")
      );

      onSnapshot(teamRef, (snapshot) => {
        const results: Team[] = [];
        snapshot.docs.forEach((doc, i) => {
          results.push({ ...doc.data(), id: doc.id } as Team);
          const emailRef = collection(db, "email");
          const emailQuery = query(emailRef, where("uid", "==", results[i].uid));
          onSnapshot(emailQuery, (emailSnapshot) => {
            emailSnapshot.docs.forEach((emailDoc) => {
              results[i].email = emailDoc.data().email;
            });
            setUsers(results);
          });
        });
      });

      setLoading(false);
    }
  }, [q]);
  return [users, loading];
};

export default useSearchTeam;

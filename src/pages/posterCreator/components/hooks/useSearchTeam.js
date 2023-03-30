import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { db } from "../../../../firebase/config";

const useSearchTeam = (q) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (q) {
      setLoading(true);
      setError(null);
      let teamRef = collection(db, "Teams");
      teamRef = query(teamRef, where('firstName', '>=', q), where('firstName', '<', q + '\uf8ff'), orderBy('firstName'));

      onSnapshot(teamRef, (snapshot) => {
        let results = []
        snapshot.docs.forEach((doc,i) => {
          results.push({ ...doc.data(), id: doc.id });
          // query the email collection for the user's email
          const emailRef = collection(db, "email");
          const emailQuery = query(emailRef, where('uid', '==', results[i].uid));
          onSnapshot(emailQuery, (emailSnapshot) => {
            emailSnapshot.docs.forEach(emailDoc => {
              results[i].email = emailDoc.data().email;
              
            });
            setUsers(results);
          });
        });
      });

      setLoading(false);
    }
  }, [q]);
  return [users, loading, error];
}

export default useSearchTeam;

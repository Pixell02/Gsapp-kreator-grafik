import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useSearch = (collectionName, radioValue, searchText) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  useEffect(() => {
    setLoading(true);
    setError(null);
    let collectionRef = collection(db, collectionName);
    let queryRef;

    const fetchData = async (queryRef) => {
      const snapshot = await getDocs(queryRef);
      const results = [];

      for (const doc of snapshot.docs) {
        const data = doc.data();
        const uid = data.uid;
        const teamRef = collection(db, "Teams");
        const teamQuery = query(teamRef, where("uid", "==", uid));
        const teamSnapshot = await getDocs(teamQuery);
        const teamData = teamSnapshot.docs[0]?.data();

        const emailRef = collection(db, "email");
        const emailQuery = query(emailRef, where("uid", "==", uid));
        const emailSnapshot = await getDocs(emailQuery);
        const emailData = emailSnapshot.docs[0]?.data();

        const licenseRef = collection(db, "user");
        const licenseQuery = query(licenseRef, where("uid", "==", uid));
        const licenseSnapshot = await getDocs(licenseQuery);
        const licenseData = licenseSnapshot.docs[0]?.data();

        const result = {
          ...data,
          id: doc.id,
          email: emailData?.email,
          license: licenseData?.license,
          team: {
            firstName: teamData?.firstName,
            secondName: teamData?.secondName,
            img: teamData?.img,
            sport: teamData?.sport,
          },
        };

        results.push(result);
      }

      setDocuments(results);
      setLoading(false);
    };

    if (searchText) {
      if (radioValue === "firstName") {
        queryRef = query(
          collectionRef,
          where("firstName", ">=", searchText),
          where("firstName", "<=", searchText + "\uf8ff")
        );
      } else if (radioValue === "email") {
        queryRef = query(
          collection(db, "email"),
          where("email", ">=", searchText),
          where("email", "<=", searchText + "\uf8ff")
        );
      } else if (radioValue === "id") {
        queryRef = query(collectionRef, where("uid", ">=", searchText), where("uid", "<=", searchText + "\uf8ff"));
      } else {
        queryRef = collectionRef;
      }

      const unsubscribe = onSnapshot(queryRef, (snapshot) => fetchData(queryRef));
      return unsubscribe;
    }
  }, [collectionName, radioValue, searchText]);

  useEffect(() => {
    const fetchData = async () => {
      let queryRef;
      let unsubscribe;

      queryRef = collection(db, "user");
      let results = [];
      unsubscribe = onSnapshot(queryRef, async (snapshot) => {
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data() });
        });
      });
      let emailResults = [];
      const teamSnapshot = await getDocs(query(collection(db, "email")));
      teamSnapshot.docs.forEach((doc) => {
        emailResults.push({ id: doc.id, ...doc.data() });
      });
      let TeamsResults = [];
      const teamsSnapshot = await getDocs(query(collection(db, "Teams")));
      teamsSnapshot.docs.forEach((doc) => {
        TeamsResults.push({ id: doc.id, ...doc.data() });
      });
      // setDocuments(results);
      const users = results.map((user) => {
        const userEmail = emailResults.find((emailUser) => emailUser.uid === user.uid);
        const userTeam = TeamsResults.find((teamUser) => teamUser.uid === user.uid);

        return {
          ...user,
          email: userEmail ? userEmail?.email : "",
          team: userTeam
            ? {
                firstName: userTeam?.firstName,
                secondName: userTeam?.secondName,
                img: userTeam?.img,
                sport: userTeam?.sport,
              }
            : null,
        };
      });
      setAllUsers(users);

      return () => unsubscribe();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (documents) {
      setLoading(false);
    }
  }, [documents]);

  return { documents, loading, error, allUsers };
};

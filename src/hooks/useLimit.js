import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

export const useSearch = (collectionName, radioValue, searchText) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let collectionRef = collection(db, collectionName);
    let queryRef;
    if (searchText) {
      if (radioValue === "firstName") {
        queryRef = query(
          collectionRef,
          where("firstName", ">=", searchText),
          where("firstName", "<=", searchText + "\uf8ff")
        );
        const unsubscribe = onSnapshot(queryRef, async (snapshot) => {
          let results = [];
          for (let i = 0; i < snapshot.docs.length; i++) {
            const doc = snapshot.docs[i];
            const data = doc.data();
            const emailRef = collection(db, "email");
            const emailQuery = query(emailRef, where("uid", "==", data.uid));
            const emailSnapshot = await getDocs(emailQuery);
            const emailDoc = emailSnapshot.docs[0];
            const emailData = emailDoc.data();
            const licenseRef = collection(db, "user");
            const licenseQuery = query(licenseRef, where("uid", "==", data.uid));
            const licenseSnapshot = await getDocs(licenseQuery);
            const licenseDoc = licenseSnapshot.docs[0];
            const licenseData = licenseDoc.data();
            results.push({
              ...data,
              id: doc.id,
              email: emailData.email,
              license: licenseData.license,
            });
          }
          setDocuments(results);
        });

        setLoading(false);

        return unsubscribe;
      } else if (radioValue === "email") {
        queryRef = query(
          collection(db, "email"),
          where("email", ">=", searchText),
          where("email", "<=", searchText + "\uf8ff")
        );
        const unsubscribe = onSnapshot(queryRef, async (snapshot) => {
          let results = [];
          for (let i = 0; i < snapshot.docs.length; i++) {
            const doc = snapshot.docs[i];
            const data = doc.data();
            const teamRef = collection(db, "Teams");
            const teamQuery = query(teamRef, where("uid", "==", data.uid));
            const teamSnapshot = await getDocs(teamQuery);
            const teamDoc = teamSnapshot.docs[0];
            const teamData = teamDoc.data();
            const licenseRef = collection(db, "user");
            const licenseQuery = query(licenseRef, where("uid", "==", data.uid));
            const licenseSnapshot = await getDocs(licenseQuery);
            const licenseDoc = licenseSnapshot.docs[0];
            const licenseData = licenseDoc.data();
            results.push({
              ...data,
              id: doc.id,
              license: licenseData.license,
              firstName: teamData.firstName,
              secondName: teamData.secondName,
              img: teamData.img,
              sport: teamData.sport,
            });
          }
          setDocuments(results);
        });

        setLoading(false);

        return unsubscribe;
      } else if (radioValue === "id") {
        queryRef = query(collectionRef, where("uid", ">=", searchText), where("uid", "<=", searchText + "\uf8ff"));
        const unsubscribe = onSnapshot(queryRef, async (snapshot) => {
          let results = [];
          for (let i = 0; i < snapshot.docs.length; i++) {
            const doc = snapshot.docs[i];
            const data = doc.data();
            const teamRef = collection(db, "email");
            const teamQuery = query(teamRef, where("uid", "==", data.uid));
            const teamSnapshot = await getDocs(teamQuery);
            const teamDoc = teamSnapshot.docs[0];
            const teamData = teamDoc.data();
            const licenseRef = collection(db, "user");
            const licenseQuery = query(licenseRef, where("uid", "==", data.uid));
            const licenseSnapshot = await getDocs(licenseQuery);
            const licenseDoc = licenseSnapshot.docs[0];
            const licenseData = licenseDoc.data();
            results.push({
              ...data,
              id: doc.id,
              email: teamData.email,
              license: licenseData.license,
            });
          }
          setDocuments(results);
        });

        setLoading(false);

        return unsubscribe;
      } else {
        queryRef = collectionRef;
        const unsubscribe = onSnapshot(queryRef, async (snapshot) => {
          let results = [];
          for (let i = 0; i < snapshot.docs.length; i++) {
            const doc = snapshot.docs[i];
            const data = doc.data();
            const teamRef = collection(db, "email");
            const teamQuery = query(teamRef, where("uid", "==", data.uid));
            const teamSnapshot = await getDocs(teamQuery);
            const teamDoc = teamSnapshot.docs[0];
            const teamData = teamDoc.data();
            const licenseRef = collection(db, "user");
            const licenseQuery = query(licenseRef, where("uid", "==", data.uid));
            const licenseSnapshot = await getDocs(licenseQuery);
            const licenseDoc = licenseSnapshot.docs[0];
            const licenseData = licenseDoc.data();
            results.push({
              ...data,
              id: doc.id,
              email: teamData.email,
              license: licenseData.license,
            });
          }
          setDocuments(results);
        });
        return unsubscribe;
      }
    }
   
  }, [collectionName, radioValue, searchText]);
  
  useEffect(() => {
    if (!searchText) {
      const ref = collection(db, "Teams");
      const unsubscribe = onSnapshot(ref, async (snapshot) => {
        let results = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          const doc = snapshot.docs[i];
          const data = doc.data();
          
  
          if (data.uid) {
            const teamRef = collection(db, "email");
            const teamQuery = query(teamRef, where("uid", "==", data.uid));
            const teamSnapshot = await getDocs(teamQuery);
            const teamDoc = teamSnapshot.docs[0];
            const teamData = teamDoc?.data()?.email;
            const licenseRef = collection(db, "user");
            const licenseQuery = query(licenseRef, where("uid", "==", data.uid));
            const licenseSnapshot = await getDocs(licenseQuery);
            const licenseDoc = licenseSnapshot.docs[0];
            const licenseData = licenseDoc?.data()?.license;
            
  
            results.push({
              ...data,
              id: doc.id,
              email: teamData,
              license: licenseData,
            });
          }
        }
  
        setDocuments(results);
      });
  
      return () => unsubscribe();
    }
  }, [collectionName, searchText]);
  
  

  return { documents, loading, error };
};

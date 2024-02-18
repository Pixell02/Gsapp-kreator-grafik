import { collection, deleteDoc, deleteField, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { License, useLicenseContext } from "../../../context/LicenseContext";
import { TeamAccount } from "../components/MultiAccountContainer";

const useAccountData = (accounts: TeamAccount) => {
  const { user } = useAuthContext();
  const [accountData, setAccountData] = useState("");
  const [users, setUsers] = useState<{ email: string; uid: string }[]>([]);
  const [alert, setAlert] = useState("");
  const { license } = useLicenseContext();

  useEffect(() => {
    if (accounts?.users?.length > 0) {
      setUsers(accounts.users);
    }
  }, [accounts]);

  const handleDeleteTeam = async () => {
    const ref = doc(db, "teamAccounts", accounts.id);
    users.forEach(async (users) => {
      const q = query(collection(db, "user"), where("uid", "==", users.uid));
      const userSnapshot = await getDocs(q);
      let userId = "";
      userSnapshot.forEach((doc) => {
        userId = doc.id;
      });
      const userRef = doc(db, "user", userId);
      updateDoc(userRef, {
        team: deleteField(),
      });
    });
    await deleteDoc(ref);
  };

  const handleDeleteUser = async (id: string) => {
    const ref = doc(db, "teamAccounts", accounts.id);
    const q = query(collection(db, "user"), where("uid", "==", id));
    const userSnapshot = await getDocs(q);
    let userId = "";
    userSnapshot.forEach((doc) => {
      userId = doc.id;
    });
    const userRef = doc(db, "user", userId);
    updateDoc(userRef, {
      license: "no-license",
      expireDate: deleteField(),
      team: deleteField(),
    });

    const filteredUsers = users.filter((user) => user.uid !== id);
    updateDoc(ref, {
      users: filteredUsers,
    });
  };

  const handleAddUser = async (accountData: string) => {
    const q = query(collection(db, "email"), where("email", "==", accountData));
    const querySnapshot = await getDocs(q);
    let userEmail = {
      uid: "",
      email: "",
    };
    querySnapshot.forEach((doc) => {
      userEmail = doc.data() as { uid: string; email: string };
    });
    const q2 = query(collection(db, "user"), where("uid", "==", userEmail.uid));
    const snapshot = await getDocs(q2);
    let userTeam: License = {
      id: "",
      license: "no-license",
      uid: "",
    };
    snapshot.forEach((doc) => {
      userTeam = doc.data() as License;
    });
    if (!userTeam) {
      setAlert("użytkownik nie istnieje");
    } else {
      if (userTeam.team) {
        setAlert("użytkownik już został dodany do grupy, bądź jest już do jakieś przypisany");
      } else {
        const ref = doc(db, "teamAccounts", accounts.id);
        updateDoc(ref, {
          users: [
            ...users,
            {
              email: userEmail.email,
              uid: userEmail.uid,
            },
          ],
        });
        const licenseQuery = query(collection(db, "user"), where("uid", "==", userEmail.uid));
        const querySnapshot = await getDocs(licenseQuery);
        let result = "";
        querySnapshot.forEach((doc) => {
          result = doc.id;
        });
        const userRef = doc(db, "user", result);
        if (license.license === "full-license") {
          setDoc(userRef, {
            license: "full-license",
            expireDate: license.expireDate,
            team: user.uid,
            uid: userEmail.uid,
          });
        } else {
          updateDoc(userRef, {
            team: user.uid,
          });
        }
        setAlert("użytkownik dodany");
      }
    }
  };

  return { accountData, setAccountData, handleAddUser, alert, handleDeleteUser, handleDeleteTeam };
};

export default useAccountData;

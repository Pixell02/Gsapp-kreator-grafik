import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";

const deleteData = async (user, oldName) => {
  const playerRef = collection(db, "Players");
  const opponentRef = collection(db, "Opponents");
  const playerQuery = query(playerRef, where("uid", "==", user), where("team", "==", oldName));
  const opponentQuery = query(opponentRef, where("uid", "==", user), where("team", "==", oldName));

  const playerSnapshots = await getDocs(playerQuery);
  const opponentSnapshots = await getDocs(opponentQuery);

  const playerPromises = playerSnapshots.docs.map(async (snap) => {
    const docRef = doc(db, "Players", snap.id);
    return await deleteDoc(docRef);
  });

  const opponentPromises = opponentSnapshots.docs.map(async (snap) => {
    const docRef = doc(db, "Opponents", snap.id);
    return await deleteDoc(docRef);
  });

  await Promise.all([...playerPromises, ...opponentPromises]);
};

export default deleteData;

import { collection, getDocs, query, updateDoc, where, doc, runTransaction, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

const updateData = async (user, oldName, firstName, secondName) => {
  
    const playerRef = collection(db, "Players");
    const opponentRef = collection(db, "Opponents");
    const playerQuery = query(playerRef, where("uid", "==", user), where("team", "==", oldName));
    const opponentQuery = query(opponentRef, where("uid", "==", user), where("team", "==", oldName));

    const playerSnapshots = await getDocs(playerQuery);
    const opponentSnapshots = await getDocs(opponentQuery);

  const playerPromises = playerSnapshots.docs.map(async (snap) => {
    const docRef = doc(db, "Players", snap.id);
    return await updateDoc(docRef, {
      team: firstName + " " + secondName
    })
    
  })
  
  const opponentPromises = opponentSnapshots.docs.map(async (snap) => {
      const docRef = doc(db, "Opponents", snap.id)
      return await updateDoc(docRef, {
        team: firstName + " " + secondName
      })
  });

    await Promise.all([...playerPromises, ...opponentPromises]);

    
  
};

export default updateData;

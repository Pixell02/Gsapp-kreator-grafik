import { collection } from "firebase/firestore"

const updatePlayer = async (id, updates) => {
    await collection("Players").doc(id).update(updates);
    const doc = await collection("Players").doc(id).get();

    const user = {
        id: doc.id,
        ... doc.data(),
    };
    return user;
}

export default updatePlayer;
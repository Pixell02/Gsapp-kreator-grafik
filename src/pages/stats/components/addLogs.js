import { addDoc, collection } from "firebase/firestore"
import { db } from "../../../firebase/config"

export const addPlayerLog = (user, player, email) => {
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `dodał zawodnika ${player.firstName} ${player.secondName}`,
      to: email[0].email,
      date: Date.now()
    })
}

export const addPlayerWithImgLog = (user, player, email) => {
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `dodał zawodnika ${player.firstName} ${player.secondName} ze zdjęciem do ${player.team}`,
      to: email[0].email,
      date: Date.now()
    })
}

export const editPlayerWithImgLog = (user, player, email) => {
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `dodał zdjęcie do ${player.firstName} ${player.secondName}`,
      to: email[0].email,
      date: Date.now()
    })
}

export const addTeamWithImgLog = (user, team, email) => { 
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `dodał zawodnika ${team.firstName} ${team.secondName} z herbem`,
      to: email[0].email,
      date: Date.now()
    })
}

export const addTeamLog = (user, team, email) => { 
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `dodał drużynę ${team.firstName} ${team.secondName}`,
      to: email[0].email,
      date: Date.now()
    })
}
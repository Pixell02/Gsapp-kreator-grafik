import { addDoc, collection } from "firebase/firestore"
import { db } from "../../../firebase/config"

export const addPlayerLog = (user, playerFirstName, playerSecondName, playerTeam, email) => {

  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `dodał zawodnika ${playerFirstName} ${playerSecondName} bez zdjęcia do ${playerTeam}`,
      to: email[0].email,
      date: Date.now()
    })
}

export const addPlayerWithImgLog = (user, playerFirstName, playerSecondName, playerNumber, playerTeam, email) => {
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `dodał zawodnika ${playerNumber} ${playerFirstName} ${playerSecondName} ze zdjęciem do ${playerTeam}`,
      to: email[0].email,
      date: Date.now()
    })
}

export const editPlayerWithImgLog = (user, playerFirstName, playerSecondName, playerNumber, email) => {
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `edytował i dodał zdjęcie do ${playerNumber} ${playerFirstName} ${playerSecondName}`,
      to: email[0].email,
      date: Date.now()
    })
}

export const editPlayerLog = (user, player, email) => {
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `edytował zawodnika ${player.firstName} ${player.secondName}`,
      to: email[0].email,
      date: Date.now()
    })
}

export const addTeamWithImgLog = (user, team, email) => { 
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `dodał drużynę ${team.firstName} ${team.secondName} z herbem`,
      to: email[0].email,
      date: Date.now()
    })
}

export const addTeamLog = (user, team, email) => { 
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `dodał drużynę ${team.firstName} ${team.secondName} bez herbu`,
      to: email[0].email,
      date: Date.now()
    })
}
export const editTeamWithImgLog = (user, team, email) => { 
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `edytował drużynę ${team.firstName} ${team.secondName} i dodał herb`,
      to: email[0].email,
      date: Date.now()
    })
}

export const editTeamLog = (user, team, email) => { 
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `edytował drużynę ${team.firstName} ${team.secondName}`,
      to: email[0].email,
      date: Date.now()
    })
}
export const addOpponentWithImgLog = (user, team, email) => { 
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `dodał przeciwnika ${team.firstName} ${team.secondName} z herbem`,
      to: email[0].email,
      date: Date.now()
    })
}

export const addOpponentLog = (user, team, email) => { 
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `dodał przeciwnika ${team.firstName} ${team.secondName} bez herbu`,
      to: email[0].email,
      date: Date.now()
    })
}
export const editOpponentWithImgLog = (user, team, email) => { 
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `edytował przeciwnika ${team.firstName} ${team.secondName} i dodał herb`,
      to: email[0].email,
      date: Date.now()
    })
}

export const editOpponentLog = (user, team, email) => { 
  const logRef = collection(db, "logs");
    addDoc(logRef, {
      from: user.email,
      description: `edytował przeciwnika ${team.firstName} ${team.secondName}`,
      to: email[0].email,
      date: Date.now()
    })
}
import React, { useEffect, useState } from "react";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import MainFooter from "../../../components/MainFooter";
import { useCollection } from "../../../hooks/useCollection";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import EditYourTeamWindow from "./EditYourTeamWindow";
import AddTeamWindow from "./addTeamWindow";
import YourTeamBlock from "./YourTeamBlock";
// Styles

import "./MainYourTeamPanel.css";
import * as Icon from "react-bootstrap-icons";

function MainYourTeamPanel() {
  const [openEditYourTeam, setOpenEditYourTeam] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [currentData, setCurrentData] = useState();
  const [userDate, setUserDate] = useState();
  const { id } = useParams();
  const { user } = useAuthContext();
  const { documents: Team } = useCollection("Teams", ["uid", "==", user.uid]);
  const {documents: Transactions} = useCollection("transaction", ["uid", "==", user.uid]);
  

  useEffect(() => {
    if(Transactions){
    if(Transactions.length > 0) {
      const ref = doc(db, "transaction", Transactions[0].id)
      deleteDoc(ref)
    }
  }
  },[Transactions])
  useEffect(() => {
    const docRef = collection(db, "user");
    getDocs(docRef).then((snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      let licensed = [];
      users.forEach((users) => {
        if (users.uid === user.uid) {
          licensed.push(users);
        }
       
      });
      if (licensed.length === 0) {
        addDoc(docRef, {
          uid: user.uid,
          license: "free-trial",
          numberOfFreeUse: 5,
        });
      } else {

      
      const currentStamp = new Date()
      const convertedTime = currentStamp.getTime()
      const licenseDate = new Date(licensed[0].expireDate);
      const formattedLicense = licenseDate.getTime()
      const userRef = doc(db, "user", licensed[0].id);
      if (licensed[0].license === "full-license") {
        if (convertedTime > formattedLicense) {
          setDoc(userRef, {
            license: "no-license",
            expireDate: "",
            uid: user.uid,
          });
        } else {
          console.log("logged in")
        }
      }
    }});
    
  }, [userDate]);

  let checkTeam;
  if (Array.isArray(Team)) {
    if (Team.length === 0) {
      checkTeam = null;
    } else {
      checkTeam = true;
    }
  }
  return (
    <div className="main-content">
      <div className="ml-5">
        <Title title="Panel drużyny" />
        <ItemContainer>
          {checkTeam != null ? (
           <YourTeamBlock Team={Team} />
          ) : (
            <button
              className="btn primary-btn"
              onClick={() => setOpenModal(true)}
            >
              Dodaj logo
            </button>
          )}
          {openModal && (
            <AddTeamWindow
              open={openModal}
              onClose={() => setOpenModal(false)}
            />
          )}
        </ItemContainer>
      </div>
    </div>
  );
}

export default MainYourTeamPanel;

import React, { useEffect, useState } from "react";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import MainFooter from "../../../components/MainFooter";
import { useCollection } from "../../../hooks/useCollection";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, where } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import EditYourTeamWindow from "./EditYourTeamWindow";
import AddTeamWindow from "./addTeamWindow";
import YourTeamBlock from "./YourTeamBlock";
// Styles

import "./MainYourTeamPanel.css";
import * as Icon from "react-bootstrap-icons";
import { query } from "firebase/firestore";
import WelcomeModal from "./WelcomeModal";
import { useContext } from "react";
import { LicenseContext } from "../../../context/LicenseContext";

function MainYourTeamPanel() {
  const { user } = useAuthContext();
  const { setLicense } = useContext(LicenseContext);
  const [openModal, setOpenModal] = useState(false);
  const [userDate, setUserDate] = useState();
  const { documents: Team } = useCollection("Teams", ["uid", "==", user.uid]);
  const { documents: licensed} = useCollection("user", ["uid", "==", user.uid]);
  useEffect(() => {  
    if (licensed) {
      if (licensed.length > 0) {
        const currentStamp = new Date();
        const convertedTime = currentStamp.getTime();
        const licenseDate = new Date(licensed[0].expireDate);
        const formattedLicense = licenseDate.getTime();
        const userRef = doc(db, "user", licensed[0].id);
        if (licensed[0].license === "full-license") {
          if (convertedTime > formattedLicense) {
            setDoc(userRef, {
              license: "no-license",
              expireDate: "",
              uid: user.uid,
            });
          } else {
            console.log("logged in");
          }
        }
        setLicense((prev) => ({ ...prev, type: licensed[0].license }));
      }
    }
  }, [licensed]);

  const navigate = useNavigate();

  return (
    <>
      <div className="main-content">
        <div className="ml-5 w-100">
          <div className="d-flex align-items-center">
            <div className="w-100">
              <Title title="Panel drużyny" />
            </div>
            <div className="empty-container"></div>
            <div className="d-flex guide-btn-container">
              <button onClick={() => navigate("/guide")} className="btn primary-btn">
                Samouczek
              </button>
            </div>
          </div>
          <button className="btn primary-btn" onClick={() => setOpenModal(true)}>
            Dodaj drużyne
          </button>
          <ItemContainer>
            <YourTeamBlock Team={Team} />
          </ItemContainer>
        </div>
      </div>
      {openModal && <AddTeamWindow open={openModal} onClose={() => setOpenModal(false)} />}
    </>
  );
}

export default MainYourTeamPanel;

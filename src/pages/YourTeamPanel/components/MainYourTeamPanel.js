import React, { useEffect, useState } from "react";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import { useCollection } from "../../../hooks/useCollection";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import AddTeamWindow from "./addTeamWindow";
import YourTeamBlock from "./YourTeamBlock";
import WelcomeModal from "./WelcomeModal";
import { useContext } from "react";
import { LicenseContext } from "../../../context/LicenseContext";
// Styles
import "./MainYourTeamPanel.css";
function MainYourTeamPanel() {
  const { user } = useAuthContext();
  const { setLicense } = useContext(LicenseContext);
  const [openModal, setOpenModal] = useState(false);
  const { documents: Team } = useCollection("Teams", ["uid", "==", user.uid]);
  const { documents: licensed} = useCollection("user", ["uid", "==", user.uid]);
  useEffect(() => {  
    if (licensed) {
      if (licensed.length > 0) {
        // const currentStamp = new Date();
        // const convertedTime = currentStamp.getTime();
        // const licenseDate = new Date(licensed[0].expireDate);
        // const formattedLicense = licenseDate.getTime();
        // const userRef = doc(db, "user", licensed[0].id);
        // if (licensed[0].license === "full-license") {
        //   if (convertedTime > formattedLicense) {
        //     setDoc(userRef, {
        //       license: "no-license",
        //       expireDate: "",
        //       uid: user.uid,
        //     });
        //   } else {
        //     console.log("logged in");
        //   }
        // }
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

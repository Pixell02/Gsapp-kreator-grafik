import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import LeftBar from "../../components/Left-Bar";
import MainYourTeamPanel from "./components/MainYourTeamPanel";
import MainFooter from "../../components/MainFooter";
import "../../App.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { getDoc, doc, addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useCollection } from "../../hooks/useCollection";
import { Bookshelf } from "react-bootstrap-icons";
import WelcomeModal from "./components/WelcomeModal";
import { useNavigate } from "react-router-dom";
function YourTeamPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    const firstTime = localStorage.getItem("first");
    if (firstTime === null) {
      setIsOpen(true);
    } else {
      console.log("not-first-time");
    }
  }, []);
  return (
    <div className="page-container">
      <WelcomeModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="content-wrap">
        <LeftBar />
        <MainYourTeamPanel />
        <MainFooter />
      </div>
    </div>
  );
}

export default YourTeamPanel;

import React, { useEffect, useState } from "react";
import LeftBar from "../../components/Left-Bar";
import MainYourTeamPanel from "./components/MainYourTeamPanel";
import MainFooter from "../../components/MainFooter";
import "../../App.css";
import WelcomeModal from "./components/WelcomeModal";
import UpdateModal from "./components/UpdateModal";

function YourTeamPanel() {
  const [isOpen, setIsOpen] = useState(false);
  
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

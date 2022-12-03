import React from "react";
import ItemContainer from "./ItemContainer";
import Title from "./Title";
import MainFooter from "../MainFooter";
import Block from "./Block";
import "./Main.css";

function MainYourTeamPanel() {
  return (
    <div className="main-content">
      <div className="ml-5">
        <Title title="Panel drużyny" />
        <ItemContainer  />
      </div>
      <MainFooter />
    </div>
  );
}

export default MainYourTeamPanel;

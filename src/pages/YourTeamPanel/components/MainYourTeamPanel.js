import React from "react";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import MainFooter from "../../../components/MainFooter";

import "../../../components/main-content-elements/Main.css";

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

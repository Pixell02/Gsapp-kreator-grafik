import React from "react";
import MainFooter from "../MainFooter";
import Title from "./Title";
import Buttons from "./Buttons";
import ItemContainer from "./ItemContainer";
import Block from "./Block";

function SponsorsMainContent() {
    return (
        <div className="main-content">
          <div className="ml-5">
            <Title title = "Sponsorzy" />
            <Buttons name = "Dodaj sponsora"/>
            <ItemContainer  />
          </div>
          <MainFooter />
        </div>
    );
}

export default SponsorsMainContent;
import React from "react";
import MainFooter from "../MainFooter";
import Title from "./Title";
import Buttons from "./Buttons";
import ItemContainer from "./ItemContainer";
import Block from "./Block";

function OpponentsMainContent() {
    return (
        <div className="main-content">
          <div className="ml-5">
            <Title title = "Przeciwnicy" />
            <Buttons name = "Dodaj przeciwnika"/>
            <ItemContainer element = {<Block />} />
          </div>
          <MainFooter />
        </div>
    );
}

export default OpponentsMainContent;
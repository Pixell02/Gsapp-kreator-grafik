import React from "react";
import MainFooter from "../../../components/MainFooter";
import Title from "../../../components/main-content-elements/Title";
import "./MainContentOffer.css";
import BuyFormContainer from "./BuyFormContainer";
import { useState } from "react";

function MainContentOffer() {

    return (
        <div className="main-content">
          <div className="ml-5">
            <Title title = "Kup dostęp" />
            <BuyFormContainer />  
          </div>
        </div>
    );
}

export default MainContentOffer;
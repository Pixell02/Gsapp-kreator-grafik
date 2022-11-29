import React from "react";
import MainFooter from "../MainFooter";
import Title from "./Title";
import Buttons from "./Buttons";
import ItemContainer from "./ItemContainer";
import Block from "./Block";
import "./MainContentOffer.css";
import BuyFormContainer from "./BuyFormContainer";
function MainContentOffer() {

    // let rangeValue = document.querySelector(".rangeValue").value;

    return (
        <div className="main-content">
          <div className="ml-5">
            <Title title = "Kup dostęp" />
            <div className="range-container">
              <div className="range-item">
                <input type="range" min="1" max="12" className="rangeValue" />
              </div>
              <span>Liczba miesięcy: 12</span>
            </div>
            <BuyFormContainer />  
          </div>
          <MainFooter />
        </div>
    );
}

export default MainContentOffer;
import React from "react";
import MainFooter from "../../../components/MainFooter";
import Title from "../../../components/main-content-elements/Title";
import "./MainContentOffer.css";
import BuyFormContainer from "./BuyFormContainer";
import { useState } from "react";

function MainContentOffer() {

    const [month, setMonth] = useState(1);
    

    return (
        <div className="main-content">
          <div className="ml-5">
            <Title title = "Kup dostęp" />
            
            <BuyFormContainer price = {month} />  
          </div>
        </div>
    );
}

export default MainContentOffer;
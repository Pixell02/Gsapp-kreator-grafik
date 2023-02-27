import React from 'react';
import "./Footer.css";
import popUpAdd from "../img/popUpAdd.jpg";
function Footer() {

    return(
    <div className='main-footer '>
      <div className="container">
        <div className="row">
        <img src={popUpAdd} className="popUp-container" />
        </div>
      </div>
    </div>
    );
}

export default Footer;
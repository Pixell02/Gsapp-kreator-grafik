import React from "react";
import "./Footer.css";
import popUpAdd from "../img/popUpAdd.jpg";
import googlePlayButton from "../img/googlePlayButton.png";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container d-flex w-100">
        <div className="popUp-items">
          <div className="link-item">
            <a href="http://grafika-sportowa.pl/kategoria-produktu/dedykowane/">
              <img src={popUpAdd} className="popUp-container" />
            </a>
          </div>
          <div className="google-play-container">
            <div className="google-play-image">
              <img src={googlePlayButton} style={{ width: "100px" }} />
            </div>
            <div className="title-container">
              <div>Już teraz pobierz naszą aplikację </div>
            </div>
            <div className="button-container">
              <a href="https://play.google.com/store/apps/details?id=com.pixeu.gsapp">
                <button className="button">Pobierz</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

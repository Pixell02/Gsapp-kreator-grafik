import React from "react";
import Title from "../../../components/main-content-elements/Title";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import translate from "../locales/translate.json";
import addTeam from "../assets/addTeam.png";
import addPlayer from "../assets/addPlayer.png";
import addOpponent from "../assets/addOpponent.png";
import generate from "../assets/generuj grafikę.png";
import orderGraphic from "../assets/zamów własne grafiki.png";
import plusSign from "../assets/plus.png";
import arrowSign from "../assets/arrow.png";
import "./navbar.css";

const Navbar = () => {
  const { language } = useContext(LanguageContext);
  // const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  
  const navItem = [
    { name: translate.createTeam[language], link: `/${language}/yourTeamPanel`, image: addTeam, sign: plusSign},
    { name: translate.addPlayer[language], link: `/${language}/players`, image: addPlayer, sign: plusSign},
    { name: translate.addOpponent[language], link: `/${language}/opponents`, image: addOpponent, sign: plusSign},
    { name: translate.generate[language], link: `/${language}/catalog`, image: generate, sign: arrowSign},
    { name: translate.order[language], link: `http://grafika-sportowa.pl/sklep/`, image: orderGraphic, sign: arrowSign},
  ]
  
  return (
    <div className="navbar-content">
      <h3>
        {translate.navbar[language]}
      </h3>
      <div className="d-flex w-100 flex-row flex-wrap">
        {navItem.map((item, i) => (
          <Link to={item.link}>
            <div className="nav-item-container" key={i} style={{ backgroundImage: `url(${item.image})` }}>
              <div className="d-flex w-100 align-items-end justify-content-end sign-container">
                <img src={item.sign} alt="sign" />
              </div>
              <div className="d-flex w-100 align-items-end justify-content-end">
                <span>{item.name.toUpperCase()}</span>
              </div>
            </div>
          </Link>
        ))}
        
      </div>
    </div>
  );
};

export default Navbar;

import { useEffect, useState, useRef } from "react";
import { ReactComponent as PlayerIcon } from "./../img/player.svg";
import { Link, useParams } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import * as Icon from "react-bootstrap-icons";
import "./LeftBar.css";
import logo from "../img/logo.png";
import {ReactComponent as Crest} from "../img/crest_2.svg";

function LeftBar() {
  const { logout } = useLogout();
  const params = useParams();
  const [isHover, setIsHover] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const hideElement = useRef(null);

  const handleClickOutside = (e) => {
    if (!hideElement.current.contains(e.target)) {
      setIsActive(false);
    }
  };
  useEffect(() => {
    document.body.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsActive]);

  return (
    <div className="left-bar">
      
      <div className="logo-item">
        <img src={logo} className="logo-image" />
      </div>
      <div ref={hideElement} className="links-container">
        <ul>
          <div className="list-item">
            <Icon.List style={{height: "50px", width: "auto"}} onClick={() => isActive == true ? setIsActive(false) : setIsActive(true) } />
          </div>
          <Link key="1" to={`/catalog`} className="icon text-white link-content" onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(null)}>
            <li>
              <Icon.CardList className="icon-element" />
            </li>
            {isHover == 1 ? <span className="extended-text">Katalog</span> : <span className="slide-text">Katalog</span>}
            {isActive ? <span className="extended-text">Katalog</span> : <span className="slide-text">Katalog</span>}
          </Link>
          <Link key="2" to={`/yourCatalog`} className="icon text-white link-content" onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.PersonRolodex className="icon-element" />
            </li>
            {isHover == 2 ? <span className="extended-text">Twój katalog</span> : <span className="slide-text">Twój katalog</span>}
            {isActive ? <span className="extended-text">Twój katalog</span> : <span className="slide-text">Twój katalog</span>}
          </Link>
          <Link key="3" to={`/yourTeamPanel`} className="icon text-white link-content" onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.GridFill className="icon-element" />
            </li>
            {isHover == 3 ? <span className="extended-text">Panel drużyny</span> : <span className="slide-text">Panel drużyny</span>}
            {isActive ? <span className="extended-text">Panel drużyny</span> : <span className="slide-text">Panel drużyny</span>}
          </Link>
          <Link key="4" to={`/players`} className="icon text-white link-content" onMouseEnter={() => setIsHover(4)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.People className="icon-element" />
            </li>
            {isHover == 4 ? <span className="extended-text">Zawodnicy</span> : <span className="slide-text">Zawodnicy</span>}
            {isActive ? <span className="extended-text">Zawodnicy</span> : <span className="slide-text">Zawodnicy</span>}
          </Link>
          <Link key="5" to={`/opponents`} className="icon text-white link-content" onMouseEnter={() => setIsHover(5)} onMouseLeave={() => setIsHover(null)}>
            <li>
              <Crest className="icon-element" />
            </li>
            {isHover == 5 ? <span className="extended-text">Przeciwnicy</span> : <span className="slide-text">Przeciwnicy</span>}
            {isActive ? <span className="extended-text">Przeciwnicy</span> : <span className="slide-text">Przeciwnicy</span>}
          </Link>
          <div key="6" className="icon text-white link-content" onMouseEnter={() => setIsHover(6)} onMouseLeave={() => setIsHover(null)}>
            <li>
              <Icon.StarFill
                className="icon-element"
                style={{ color: "#Dcdcdc" }}
              />
            </li>
            {isHover == 6 ? <span className="extended-text" style={{color: "gray"}}>Sponsorzy<Icon.LockFill style={{margin:"0 0 0 5px"}} /></span> : <span className="slide-text"  style={{color: "gray"}}>Sponsorzy <Icon.LockFill style={{margin:"0 0 0 5px"}} /></span>}
            {isActive ? <span className="extended-text" style={{color: "gray"}}>Sponsorzy<Icon.LockFill style={{margin:"0 0 0 5px"}} /></span> : <span className="slide-text" style={{color: "gray"}}>Sponsorzy <Icon.LockFill style={{margin:"0 0 0 5px"}} /></span>}
          </div>
          <Link key="7" to={`/offer`} className="icon text-white link-content" onMouseEnter={() => setIsHover(7)} onMouseLeave={() => setIsHover(null)}>
            <li>
              <Icon.Cash className="icon-element" />
            </li>
            {isHover == 7 ? <span className="extended-text">Kup dostęp</span> : <span className="slide-text">Kup dostęp</span>}
            {isActive ? <span className="extended-text">Kup dostep</span> : <span className="slide-text">Kup dostep</span>}
          </Link>
          <Link key="8" to={`/account`} className="icon text-white link-content" onMouseEnter={() => setIsHover(8)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.PersonCircle className="icon-element" />
            </li>
            {isHover == 8 ? <span className="extended-text">Konto</span> : <span className="slide-text">Konto</span>}
            {isActive ? <span className="extended-text">Konto</span> : <span className="slide-text">Konto</span>}
          </Link>
          <Link key="9"  onClick={logout} className="icon text-white link-content" onMouseEnter={() => setIsHover(9)} onMouseLeave={() => setIsHover(null)} >
            <li >
              <Icon.BoxArrowRight className="icon-element" />
            </li>
            {isHover == 9 ? <span className="extended-text">Wyloguj sie</span> : <span className="slide-text">Wyloguj sie</span>}
            {isActive ? <span className="extended-text">Wyloguj się</span> : <span className="slide-text">Wyloguj się</span>}
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default LeftBar;

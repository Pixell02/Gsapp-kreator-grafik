import { useEffect, useState, useRef } from "react";
import { ReactComponent as PlayerIcon } from "./../img/player.svg";
import { Link, useParams } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { useLogout } from "../hooks/useLogout";
import * as Icon from "react-bootstrap-icons";
import "./LeftBar.css";
import logo from "../img/2.svg";
import {ReactComponent as Crest} from "../img/crest_2.svg";
import { useAuthContext } from "../hooks/useAuthContext";

function LeftBar() {
  const { logout } = useLogout();
  const params = useParams();
  const { user } = useAuthContext();
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
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
      
      <div className="logo-item" style={{backgroundColor: "black"}}>
        <img src={logo} className="logo-image" />
      </div>
      <div ref={hideElement} className="links-container">
        <ul>
          <div className="list-item">
            <Icon.List style={{height: "50px", width: "auto"}} onClick={() => isActive == true ? setIsActive(false) : setIsActive(true) } />
          </div>
          {Teams && Teams.length > 0 && Teams[0].sport ? (
          <Link key="1" to={`/catalog`} className="icon text-white link-content" onMouseEnter={() => setIsHover(1)} onMouseLeave={() => setIsHover(null)}>
            <li>
              <Icon.CardList className="icon-element" />
            </li>
            <span className={isHover === 1 ? "extended-text" : "slide-text"}>Katalog </span> 
            <span className={isActive ? "extended-text" : "slide-text"}>Katalog </span> 
          </Link>
            )
           : (<div className="icon text-white link-content">
            <li>
              <Icon.CardList className="icon-element" style={{opacity:"0.5"}} />
            </li>
            <span className={isHover === 1 ? "extended-text" : "slide-text"}>Katalog <Icon.LockFill style={{margin:"0 0 0 5px"}} /></span> 
            <span className={isActive ? "extended-text" : "slide-text"}>Katalog <Icon.LockFill style={{margin:"0 0 0 5px"}} /></span> 
            </div>
            )}
            
          <Link key="2" to={`/yourCatalog`} className="icon text-white link-content" onMouseEnter={() => setIsHover(2)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.PersonRolodex className="icon-element" />
            </li>
            <span className={isHover === 2 ? "extended-text" : "slide-text"}>Twój katalog</span>
            <span className={isActive ? "extended-text" : "slide-text"}>Twój katalog</span>           </Link>
          <Link key="3" to={`/yourTeamPanel`} className="icon text-white link-content" onMouseEnter={() => setIsHover(3)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.GridFill className="icon-element" />
            </li>
            <span className={isHover === 3 ? "extended-text" : "slide-text"}>Panel drużyny</span>
            {isActive ? <span className="extended-text">Panel drużyny</span> : <span className="slide-text">Panel drużyny</span>}
          </Link>
          <Link key="4" to={`/players`} className="icon text-white link-content" onMouseEnter={() => setIsHover(4)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.People className="icon-element" />
            </li>
            <span className={isHover === 4 ? "extended-text" : "slide-text"}>Zawodnicy</span>
            {isActive ? <span className="extended-text">Zawodnicy</span> : <span className="slide-text">Zawodnicy</span>}
          </Link>
          <Link key="5" to={`/opponents`} className="icon text-white link-content" onMouseEnter={() => setIsHover(5)} onMouseLeave={() => setIsHover(null)}>
            <li>
              <Crest className="icon-element" />
            </li>
            <span className={isHover === 5 ? "extended-text" : "slide-text"}>Przeciwnicy</span>
            {isActive ? <span className="extended-text">Przeciwnicy</span> : <span className="slide-text">Przeciwnicy</span>}
          </Link>
          
          <Link key="7" to={`/offer`} className="icon text-white link-content" onMouseEnter={() => setIsHover(7)} onMouseLeave={() => setIsHover(null)}>
            <li>
              <Icon.Cash className="icon-element" />
            </li>
            <span className={isHover === 7 ? "extended-text" : "slide-text"}>Kup dostęp</span>
            {isActive ? <span className="extended-text">Kup dostep</span> : <span className="slide-text">Kup dostep</span>}
          </Link>
          <Link key="8" to={`/account`} className="icon text-white link-content" onMouseEnter={() => setIsHover(8)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.PersonCircle className="icon-element" />
            </li>
            <span className={isHover === 8 ? "extended-text" : "slide-text"}>Konto</span>
            {isActive ? <span className="extended-text">Konto</span> : <span className="slide-text">Konto</span>}
          </Link>
          {user && user.uid === "hgwaMbxg3qWnQyqS44AtyTrkSA93" && (
            <>
            <Link key="9" to={`/stats`} className="icon text-white link-content" onMouseEnter={() => setIsHover(9)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.BarChartFill className="icon-element" />
            </li>
            <span className={isHover === 9 ? "extended-text" : "slide-text"}>Statystyki</span>
            {isActive ? <span className="extended-text">Statystyki</span> : <span className="slide-text">Statystyki</span>}
          </Link>
          <Link key="10" to={`/posterCreator`} className="icon text-white link-content" onMouseEnter={() => setIsHover(10)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.BoundingBoxCircles className="icon-element" />
            </li>
            <span className={isHover === 10 ? "extended-text" : "slide-text"}>Kreator</span>
            {isActive ? <span className="extended-text">Kreator</span> : <span className="slide-text">Kreator</span>}
          </Link>
          </>
          )}
          {user && user.uid === "6vVYzE860LS6Ua4nIIfCSul7feD2" && (
            <>
            <Link key="9" to={`/stats`} className="icon text-white link-content" onMouseEnter={() => setIsHover(9)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.BarChartFill className="icon-element" />
            </li>
            <span className={isHover === 9 ? "extended-text" : "slide-text"}>Statystyki</span>
            {isActive ? <span className="extended-text">Statystyki</span> : <span className="slide-text">Statystyki</span>}
          </Link>
          <Link key="10" to={`/posterCreator`} className="icon text-white link-content" onMouseEnter={() => setIsHover(10)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.BoundingBoxCircles className="icon-element" />
            </li>
            <span className={isHover === 10 ? "extended-text" : "slide-text"}>Kreator</span>
            {isActive ? <span className="extended-text">Kreator</span> : <span className="slide-text">Kreator</span>}
          </Link>
          </>
          )}
          {user && user.uid === "ait7T01TWaPDqx3a4YsogOQrL4O2" && (
            <>
            <Link key="9" to={`/stats`} className="icon text-white link-content" onMouseEnter={() => setIsHover(9)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.BarChartFill className="icon-element" />
            </li>
            <span className={isHover === 9 ? "extended-text" : "slide-text"}>Statystyki</span>
            {isActive ? <span className="extended-text">Statystyki</span> : <span className="slide-text">Statystyki</span>}
          </Link>
          <Link key="10" to={`/posterCreator`} className="icon text-white link-content" onMouseEnter={() => setIsHover(10)} onMouseLeave={() => setIsHover(null)} >
            <li>
              <Icon.BoundingBoxCircles className="icon-element" />
            </li>
            <span className={isHover === 10 ? "extended-text" : "slide-text"}>Kreator</span>
            {isActive ? <span className="extended-text">Kreator</span> : <span className="slide-text">Kreator</span>}
          </Link>
          </>
          )}
          
          <Link key="11"  onClick={logout} className="icon text-white link-content" onMouseEnter={() => setIsHover(11)} onMouseLeave={() => setIsHover(null)} >
            <li >
              <Icon.BoxArrowRight className="icon-element" />
            </li>
            <span className={isHover === 11 ? "extended-text" : "slide-text"}>Wyloguj się</span>
            {isActive ? <span className="extended-text">Wyloguj się</span> : <span className="slide-text">Wyloguj się</span>}
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default LeftBar;

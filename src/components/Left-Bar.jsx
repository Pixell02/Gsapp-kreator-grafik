import { useContext, useEffect, useRef, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import { TeamContext } from "../context/TeamContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";
import { useLogout } from "../hooks/useLogout";
import useTeamLicenseCollection from "../hooks/useTeamLicenseCollection";
import logo from "../img/2.svg";
import LanguageOption from "./LanguageOption";
import { useLanguageContext } from "../context/LanguageContext";
import "./LeftBar.css";
import useLinkOption from "./leftBar/useLinkOption";
import LinkItem from "./leftBar/LinkItem";

function LeftBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const { documents: LicensedTeams } = useTeamLicenseCollection("Teams");
  const [isHover, setIsHover] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const { language } = useLanguageContext();
  const hideElement = useRef(null);
  const { setSportKeys } = useContext(TeamContext);
  const option = useLinkOption();
  useEffect(() => {
    if (Teams || LicensedTeams) {
      const uniqueSportKeys = Array.from(new Set(Teams?.map((team) => team.sport)));
      const TeamUniqueSportKeys = Array.from(new Set(LicensedTeams?.map((team) => team.sport)));
      if (uniqueSportKeys.length > 0) {
        setSportKeys(uniqueSportKeys);
      } else {
        setSportKeys(TeamUniqueSportKeys);
      }
    }
  }, [Teams, setSportKeys, LicensedTeams]);

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
      <div className="logo-item" style={{ backgroundColor: "black" }}>
        <img src={logo} className="logo-image" alt="error" />
      </div>
      <div className="d-flex w-100 align-items-center mt-3">
        <LanguageOption />
      </div>
      <div ref={hideElement} className="links-container">
        <ul>
          <div className="list-item">
            <Icon.List
              style={{ height: "50px", width: "auto" }}
              onClick={() => (isActive === true ? setIsActive(false) : setIsActive(true))}
            />
          </div>
          {option.map((option, i) => (
            <LinkItem key={i} i={i} icon={option.icon} isActive={isActive} text={option.text} link={option.link} />
          ))}
          {user &&
            (user.uid === "hgwaMbxg3qWnQyqS44AtyTrkSA93" ||
              user.uid === "6vVYzE860LS6Ua4nIIfCSul7feD2" ||
              user.uid === "yALsGjEPaRcTIkBslb8TZrvgY6u1" ||
              user.uid === "ait7T01TWaPDqx3a4YsogOQrL4O2") && (
              <>
                <Link
                  key="9"
                  to={`/${language}/stats`}
                  className="icon text-white link-content"
                  onMouseEnter={() => setIsHover(9)}
                  onMouseLeave={() => setIsHover(null)}
                >
                  <li>
                    <Icon.BarChartFill className="icon-element" />
                  </li>
                  <span className={isHover === 9 ? "extended-text" : "slide-text"}>Statystyki</span>
                  {isActive ? (
                    <span className="extended-text">Statystyki</span>
                  ) : (
                    <span className="slide-text">Statystyki</span>
                  )}
                </Link>
                <Link
                  key="10"
                  to={`/${language}/posterCreator`}
                  className="icon text-white link-content"
                  onMouseEnter={() => setIsHover(10)}
                  onMouseLeave={() => setIsHover(null)}
                >
                  <li>
                    <Icon.BoundingBoxCircles className="icon-element" />
                  </li>
                  <span className={isHover === 10 ? "extended-text" : "slide-text"}>Kreator</span>
                  {isActive ? (
                    <span className="extended-text">Kreator</span>
                  ) : (
                    <span className="slide-text">Kreator</span>
                  )}
                </Link>
              </>
            )}

          <Link
            key="11"
            onClick={logout}
            className="icon text-white link-content"
            onMouseEnter={() => setIsHover(11)}
            onMouseLeave={() => setIsHover(null)}
          >
            <li>
              <Icon.BoxArrowRight className="icon-element" />
            </li>
            <span className={isHover === 11 ? "extended-text" : "slide-text"}>Wyloguj się</span>
            {isActive ? (
              <span className="extended-text">Wyloguj się</span>
            ) : (
              <span className="slide-text">Wyloguj się</span>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default LeftBar;

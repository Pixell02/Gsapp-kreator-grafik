import React from "react";
import { useContext } from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";

export default function WorkSpaceNavbar({ setHelpLinesModal, helpLinesModal }) {
  
  const {language} = useContext(LanguageContext)

  return (
    <div className=" nav-container w-100 bg-light">
      <div class="collapse navbar-collapse d-flex flex-row w-100">
        <div class="navbar-nav d-flex flex-row ml-5" style={{marginLeft: "100px"}}>
          
          <NavDropdown title="obszar roboczy">
            <NavDropdown.Item ><Link style={{ color: "black" }} to={`/${language}/posterCreator/theme`}>do motywów</Link></NavDropdown.Item>
            <NavDropdown.Item >do GIFów</NavDropdown.Item>
          </NavDropdown>
         
        <div className="ml-5 d-flex">
            <NavDropdown title="Opcje">
              <NavDropdown.Item onClick={() => setHelpLinesModal(!helpLinesModal)}>Dodaj linię pomocniczą</NavDropdown.Item>
            <NavDropdown.Item >Dodaj kilka teł</NavDropdown.Item>
            <NavDropdown.Item >Filtry na zawodnika</NavDropdown.Item>
          </NavDropdown>
          </div>
        </div>
        <div className="d-flex justify-content-end w-100">
          <div className="d-flex flex-row align-items-center justify-content-end">
            w:
            <input className="w-25" type="number" disabled />
            sz: <input className="w-25" type="number" disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

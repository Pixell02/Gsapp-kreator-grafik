import React from "react";
import './LeftBar.css';


function LeftBar() {
  return (
    <div className="left-bar bg-secondary">
      <ul>
          <a href="/generator" className="text-white">
            <li className="link-container"><span>Generator grafik</span></li>
          </a>        
          <a href="/catalog" className="text-white">
            <li className="link-container"><span>Katalog</span></li>
          </a>
          <a href="/yourTeamPanel" className="text-white">
           <li className="link-container"><span>Panel drużyny</span></li>
          </a>
          <a href="/players" className="text-white">
            <li className="link-container"><span>Zawodnicy </span></li>
          </a>        
          <a href="/opponents" className="text-white">
             <li className="link-container"><span>Przeciwnicy</span></li>
          </a>
          <a href="/sponsors" className="text-white">
            <li className="link-container"><span>Sposorzy</span></li>
          </a>
          <a href="/yourTeams" className="text-white">
          <li className="link-container"><span>Twoje dużyny</span></li>
          </a>
        
          <a href="/offer" className="text-white">
           <li className="link-container"><span>Kup dostęp</span></li>
          </a>
          <a href="/account" className="text-white">
            <li className="link-container"><span>Konto</span></li>
          </a>
          <a href="/login" className="text-white">
            <li className="link-container"><span>Wyloguj się</span></li>
          </a>
      </ul>
    </div>
  );
}

export default LeftBar;

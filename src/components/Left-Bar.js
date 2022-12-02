import React from "react";
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import './LeftBar.css';


function LeftBar() {
  const { logout } = useLogout();
  return (
    <div className="left-bar bg-secondary">
      <ul>
          <Link to="/generator" className="text-white">
            <li className="link-container"><span>Generator grafik</span></li>
          </Link>        
          <Link to="/catalog" className="text-white">
            <li className="link-container"><span>Katalog</span></li>
          </Link>
          <Link to="/yourTeamPanel" className="text-white">
           <li className="link-container"><span>Panel drużyny</span></li>
          </Link>
          <Link to="/players" className="text-white">
            <li className="link-container"><span>Zawodnicy </span></li>
          </Link>        
          <Link to="/opponents" className="text-white">
             <li className="link-container"><span>Przeciwnicy</span></li>
          </Link>
          <Link to="/sponsors" className="text-white">
            <li className="link-container"><span>Sponsorzy</span></li>
          </Link>
          <Link to="/yourTeams" className="text-white">
          <li className="link-container"><span>Twoje dużyny</span></li>
          </Link>
        
          <Link to="/offer" className="text-white">
           <li className="link-container"><span>Kup dostęp</span></li>
          </Link>
          <Link to="/account" className="text-white">
            <li className="link-container"><span>Konto</span></li>
          </Link>
          <Link to="/login" className="text-white">
            <li onClick={ logout } className="link-container"><span>Wyloguj się</span></li>
          </Link>
      </ul>
    </div>
  );
}

export default LeftBar;

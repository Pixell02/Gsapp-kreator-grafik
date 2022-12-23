import React from "react";
import { Link, useParams } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import './LeftBar.css';


function LeftBar() {
  const { logout } = useLogout();
  const params = useParams();

  

  return (
    <div className="left-bar bg-secondary">
      <ul>
          <Link to={`/${params.id}/generator`} className="text-white">
            <li className="link-container"><span>Generator grafik</span></li>
          </Link>        
          <Link to={`/${params.id}/catalog`} className="text-white">
            <li className="link-container"><span>Katalog</span></li>
          </Link>
          <Link to={`/${params.id}/yourTeamPanel`} className="text-white">
           <li className="link-container"><span>Panel drużyny</span></li>
          </Link>
          <Link to={`/${params.id}/players`} className="text-white">
            <li className="link-container"><span>Zawodnicy </span></li>
          </Link>        
          <Link to={`/${params.id}/opponents`} className="text-white">
             <li className="link-container"><span>Przeciwnicy</span></li>
          </Link>
          <Link to={`/${params.id}/sponsors`} className="text-white">
            <li className="link-container"><span>Sponsorzy</span></li>
          </Link>
          <Link to="/yourTeams" className="text-white">
          <li className="link-container"><span>Twoje dużyny</span></li>
          </Link>
        
          <Link to={`/${params.id}/offer`} className="text-white">
           <li className="link-container"><span>Kup dostęp</span></li>
          </Link>
          <Link to={`/${params.id}/account`} className="text-white">
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

import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import "../../../components/main-content-elements/Block.css";
import catalog from './catalog.json';

function Catalog({ posters }) {
  const { user } = useAuthContext()
  const { id } = useParams()
  const [images, setImages] = useState([]);
 
  return (
    <div className="catalog-container">
      {catalog.map((poster) => (
        <div key={poster.id} className="item-window">
          <Link to={`/catalog/${poster.category}`}>
            <div className="name-content">
              <span key={poster.id} className="name-content">
                {poster.name}
              </span>
            </div>
            <div className="image-content">
              {poster.name}
            </div>
          </Link>
        </div>
      ))}
     
    </div>
  );
}

export default Catalog;

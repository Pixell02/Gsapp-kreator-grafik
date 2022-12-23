import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Block.css";

function Catalog({ posters }) {
  const { user } = useAuthContext()
  const { id } = useParams()
  return (
    <div className="catalog-container">
      {posters.map((poster) => (
        <div key={poster.id} className="item-window">
          <Link to={`/${id}/creator/${poster.id}`}>
            <div className="name-content">
              <span key={poster.id} className="name-content">
                {poster.title}
              </span>
            </div>
            <div className="image-content">
              <img src={poster.img} alt={poster.title} />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Catalog;

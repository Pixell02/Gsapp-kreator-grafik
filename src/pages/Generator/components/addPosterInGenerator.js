import { Link, useParams } from "react-router-dom";
import "../../../components/main-content-elements/Block.css";
import plus from "../../../img/plusIcon.png";


export default function AddPosterInGenerator() {
  const { id } = useParams()
  return (
    <div className="catalog-container">
      <Link to={`/${id}/catalog`}>
        <div className="item-window">
          <div className="name-content">
            <span className="name-content">Dodaj wzór</span>
          </div>
          <div className="image-content">
            <img src={plus} />
          </div>
        </div>
      </Link>
    </div>
  );
}

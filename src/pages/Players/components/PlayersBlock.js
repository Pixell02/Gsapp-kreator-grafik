import { db } from "../../../firebase/config";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

// Styling
import * as Icon from "react-bootstrap-icons";
import "../../../components/main-content-elements/Block.css";

import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Options from "../../../components/main-content-elements/Options";

export default function PlayersBlock({ players }) {
  const [showHide, setShowHide] = useState(false);

  return (
    <div className="catalog-container">
      {players.map((player) => (
        <div className="item-window">
          <div className="name-content">
            <span key={player.uid} className="name-content">
              {player.firstPlayerName + " " + player.secondPlayerName}
            </span>
            <div className="option-container">
              <button onClick={(e) => {}}>
                <Icon.ThreeDotsVertical style={{ margin: "5px 0 0 0" }} />
              </button>

             {showHide && <Options /> }
            </div>
          </div>
          <div className="image-content">
            <img
              src={player.logo}
              alt={player.firstPlayerName + " " + player.secondPlayerName}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

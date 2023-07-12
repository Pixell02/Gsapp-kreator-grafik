import React, { useContext } from "react";
import translate from "../../../locales/translate.json";
import { LanguageContext } from "../../../../../context/LanguageContext";

export default function StartingSquad({ coords, setIsModalOpen }) {
  const { language } = useContext(LanguageContext);
  return (
    <div className="d-flex flex-column mt-5">
      {coords && coords.playerOne && (
        <button className="btn" onClick={() => setIsModalOpen({ id: 1, open: true })}>
         {translate.addPlayers[language]}
        </button>
      )}
      {coords && coords.reserveOne && (
        <button className="btn mt-3" onClick={() => setIsModalOpen({ id: 2, open: true })}>
         {translate.addReserve[language]}
        </button>
      )}
    </div>
  );
}

import React, { useContext } from "react";
import translate from "../../../locales/translate.json";
import { LanguageContext } from "../../../../../context/LanguageContext";
import Select from "react-select";
import useSquadPresets from "./hooks/useSquadPresets";

export default function StartingSquad({ coords, setIsModalOpen, fabricRef, themeOption }) {
  const { language } = useContext(LanguageContext);
  const { PresetOptions, setSelectedPreset } = useSquadPresets(fabricRef, coords, themeOption);
  
  return (
    <div className="d-flex flex-column mt-4">
      {(coords?.playerOne || coords?.reserveOne) && PresetOptions?.length > 0 && (
        <div className="mb-5">
        <label>Wzór składu</label>
        <Select options={PresetOptions} onChange={(option) => setSelectedPreset(option.value)} />
        </div>
      )}
      {coords?.playerOne && (
        <button className="btn" onClick={() => setIsModalOpen({ id: 1, open: true })}>
         {translate.addPlayers[language]}
        </button>
      )}
      {coords?.reserveOne && (
        <button className="btn mt-3" onClick={() => setIsModalOpen({ id: 2, open: true })}>
         {translate.addReserve[language]}
        </button>
      )}
    </div>
  );
}

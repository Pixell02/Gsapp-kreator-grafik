import React from "react";
import { RadioProvider } from "../context/radioContext";
import TrainingPlan from "../components/TrainingPlan";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useState } from "react";
import { TeamProvider } from "../context/teamContext";
import SingleElements from "./EditPanelComponent/SingleElements";
import SelectWindow from "./EditPanelComponent/SelectWindow/SelectWindow";

export default function EditPanel({ fabricRef, coords, themeOption, setSelectThemes, themeOptions, posterBackground }) {
  const { user } = useAuthContext();
  const { documents: Opponents } = useCollection("Opponents", ["uid", "==", user.uid]);
  const { documents: Players } = useCollection("Players", ["uid", "==", user.uid]);
  const [isModalOpen, setIsModalOpen] = useState({
    id: null,
    open: false,
  });

  return (
    <RadioProvider>
      <TeamProvider>
        <div className={isModalOpen.open === true ? "show" : "hide"}>
          <SelectWindow
            coords={coords}
            fabricRef={fabricRef}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            themeOption={themeOption}
          />
        </div>
        <div className={isModalOpen.open === false ? "show" : "hide"}>
          <SingleElements
            coords={coords}
            fabricRef={fabricRef}
            themeOption={themeOption}
            themeOptions={themeOptions}
            posterBackground={posterBackground}
            setSelectThemes={setSelectThemes}
            Opponents={Opponents}
            Players={Players}
            setIsModalOpen={setIsModalOpen}
          />
          {coords && coords.dayOne && <TrainingPlan fabricRef={fabricRef} coords={coords} />}
        </div>
      </TeamProvider>
    </RadioProvider>
  );
}

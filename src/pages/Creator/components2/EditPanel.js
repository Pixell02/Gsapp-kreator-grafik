import React from "react";
import { RadioProvider } from "../context/radioContext";
import TrainingPlan from "../components/TrainingPlan";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useState } from "react";
import { TeamProvider } from "../context/teamContext";
import SingleElements from "./EditPanelComponent/SingleElements";
import SelectWindow from "./EditPanelComponent/SelectWindow/SelectWindow";
import MultiElementButtons from "./EditPanelComponent/MultiElementButtons";
import useCoords from "../hooks/useCoords";

export default function EditPanel({
  fabricRef,
  themeOption,
  setSelectThemes,
  themeOptions,
  additionalLayer,
}) {
  const { user } = useAuthContext();
  const { documents: Opponents } = useCollection("Opponents", ["uid", "==", user.uid]);
  const { documents: Players } = useCollection("Players", ["uid", "==", user.uid]);
  const { coords } = useCoords();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState({
    id: null,
    open: false,
  });

  return (
    <RadioProvider>
      <TeamProvider>
        {coords && (
          <>
            <div className={isModalOpen.open === true ? "show" : "hide"}>
              <SelectWindow
                coords={coords}
                fabricRef={fabricRef}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                themeOption={themeOption}
                setSelectedMatch={setSelectedMatch}
                selectedMatch={selectedMatch}
              />
            </div>
            <div className={isModalOpen.open === false ? "show" : "hide"}>
              <SingleElements
                coords={coords}
                fabricRef={fabricRef}
                themeOption={themeOption}
                themeOptions={themeOptions}
                setSelectThemes={setSelectThemes}
                Opponents={Opponents}
                additionalLayer={additionalLayer}
                Players={Players}
                setIsModalOpen={setIsModalOpen}
              />
              {coords?.dayOne && <TrainingPlan fabricRef={fabricRef} coords={coords} />}
              {coords?.numberOfMatches && (
                <MultiElementButtons
                  coords={coords}
                  setSelectedMatch={setSelectedMatch}
                  setIsModalOpen={setIsModalOpen}
                />
              )}
            </div>
          </>
        )}
      </TeamProvider>
    </RadioProvider>
  );
}

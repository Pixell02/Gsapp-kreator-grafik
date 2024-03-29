import React, { useState } from "react";
import TrainingPlan from "../components/TrainingPlan";
import { RadioProvider } from "../context/radioContext";
import { TeamProvider } from "../context/teamContext";
import MultiElementButtons from "./EditPanelComponent/MultiElementButtons";
import SelectWindow from "./EditPanelComponent/SelectWindow/SelectWindow";
import SingleElements from "./EditPanelComponent/SingleElements";

export default function EditPanel({ fabricRef, coords }) {
  const [selectedMatch, setSelectedMatch] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState({
    id: null,
    open: false,
  });
  return (
    <RadioProvider>
      <TeamProvider>
        {coords && fabricRef.current?._objects && (
          <>
            <div className={isModalOpen.open === true ? "show" : "hide"}>
              <SelectWindow
                coords={coords}
                fabricRef={fabricRef}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setSelectedMatch={setSelectedMatch}
                selectedMatch={selectedMatch}
              />
            </div>
            <div className={isModalOpen.open === false ? "show" : "hide"}>
              <SingleElements
                setSelectedPoster={setSelectedPoster}
                coords={coords}
                fabricRef={fabricRef}
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

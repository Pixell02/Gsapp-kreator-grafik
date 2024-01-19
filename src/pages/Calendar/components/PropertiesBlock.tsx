import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import MultiElementButtons from "../../Creator/components2/EditPanelComponent/MultiElementButtons";
import SelectWindow from "../../Creator/components2/EditPanelComponent/SelectWindow/SelectWindow";
import SingleElements from "../../Creator/components2/EditPanelComponent/SingleElements";
import { RadioProvider } from "../../Creator/context/radioContext";
import { TeamProvider } from "../../Creator/context/teamContext";
import { useThemeContext } from "../../Creator/context/ThemeContext";

export type props = {
  coords: DocumentData;
  selectedPoster: DocumentData | null;
  setSelectedPoster: (selectedPoster: DocumentData | null) => void;
};
type Modal = {
  id: number | null;
  open: boolean;
};

const PropertiesBlock = ({ coords, selectedPoster, setSelectedPoster }: props) => {
  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<Modal>({
    id: null,
    open: false,
  });

  const { setId } = useThemeContext();
  useEffect(() => {
    setId(selectedPoster?.uuid);
  }, [selectedPoster]);
  return (
    <RadioProvider>
      <TeamProvider>
        <div className={isModalOpen.open === true ? "show" : "hide"}>
          <SelectWindow
            coords={coords}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setSelectedMatch={setSelectedMatch}
            selectedMatch={selectedMatch}
          />
        </div>
        <div className={isModalOpen.open === false ? "show" : "hide"}>
          <SingleElements coords={coords} setSelectedPoster={setSelectedPoster} setIsModalOpen={setIsModalOpen} />
          {coords?.numberOfMatches && (
            <MultiElementButtons coords={coords} setSelectedMatch={setSelectedMatch} setIsModalOpen={setIsModalOpen} />
          )}
        </div>
      </TeamProvider>
    </RadioProvider>
  );
};

export default PropertiesBlock;

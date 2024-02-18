import React, { Dispatch, SetStateAction, useState } from "react";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";
import Portal from "../../../components/Portal";
import FilteredBlock, { Item } from "../../../components/main-content-elements/FilteredBlock";
import { Opponent } from "../../../types/teamTypes";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import translation from "../locales/locales.json";
import { translationProps } from "../../../types/translationTypes";
import { useLanguageContext } from "../../../context/LanguageContext";
import AddOpponentWindow from "./AddOpponentWindow";
import EditOpponentWindow from "./EditOpponentWindow";

const OpponentContent = () => {
  const { user } = useAuthContext();
  const { language } = useLanguageContext();
  const translate: translationProps = translation;
  const { documents: Opponents } = useCollection("Opponents", ["uid", "==", user.uid]);
  const { documents: LicenseOpponents } = useTeamLicenseCollection("Opponents");
  const [data, setData] = useState<Opponent | null>(null);
  const [selectedModal, setSelectedModal] = useState(0);

  const modalOptions = [
    { id: 1, component: <AddOpponentWindow setSelectedModal={setSelectedModal} /> },
    { id: 2, component: <EditOpponentWindow setSelectedModal={setSelectedModal} data={data as Opponent} /> },
  ];

  return (
    <>
      <Portal>{modalOptions.map((item) => selectedModal === item.id && item.component)}</Portal>
      <button onClick={() => setSelectedModal(1)} className="btn primary-btn">
        {translate.addOpponent[language]}
      </button>
      <div className="ml-5">
        <ItemContainer>
          {(Opponents as Item[])?.map((player, i) => (
            <FilteredBlock
              setData={setData as Dispatch<SetStateAction<Item>>}
              setSelectedModal={setSelectedModal}
              key={i}
              type={"Opponents"}
              item={player}
            />
          ))}
          {(LicenseOpponents as Item[])?.map((item, i) => (
            <FilteredBlock
              key={i}
              setData={setData as Dispatch<SetStateAction<Item>>}
              setSelectedModal={setSelectedModal}
              type={"Opponents"}
              item={item}
            />
          ))}
        </ItemContainer>
      </div>
    </>
  );
};

export default OpponentContent;

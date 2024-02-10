import { useState } from "react";
import EditYourTeamWindow from "./EditYourTeamWindow";
import "./YourTeamBlock.css";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";
import TeamBlock from "./TeamBlock";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";

import Portal from "../../../components/Portal";
import { useLanguageContext } from "../../../context/LanguageContext";
import translation from "./locales/yourTeamPanel.json";
import { translationProps } from "../../../types/translationTypes";
import { useCollection } from "../../../hooks/useCollection";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Team } from "../../../types/teamTypes";
import AddTeamWindow from "./AddTeamWindow";

export default function YourTeamContainer() {
  const [selectedModal, setSelectedModal] = useState(0);
  const translate: translationProps = translation;
  const { language } = useLanguageContext();
  const { id } = useParams();
  const { user } = useAuthContext();
  const { documents: Team } = useCollection("Teams", ["uid", "==", id || user.uid]);
  const { documents: licenseTeams } = useTeamLicenseCollection("Teams");
  const [data, setData] = useState<Team | null>(null);
  const editClick = (item: Team) => {
    setSelectedModal(2);
    setData(item);
  };
  const modalOptions = [
    { id: 1, component: <AddTeamWindow setSelectedModal={setSelectedModal} /> },
    { id: 2, component: <EditYourTeamWindow data={data as Team} setSelectedModal={setSelectedModal} /> },
  ];
  return (
    <>
      <button className="btn primary-btn" onClick={() => setSelectedModal(1)}>
        {translate.addTeam[language]}
      </button>
      <ItemContainer>
        <Portal>{modalOptions.map((item) => selectedModal === item.id && item.component)}</Portal>

        <div className="your-team-catalog-container d-flex flex-wrap">
          {Team?.map((team, i) => (
            <TeamBlock key={i} team={team} editClick={editClick} />
          ))}
          {licenseTeams?.map((item: Team, i: number) => (
            <TeamBlock key={i} team={item} editClick={editClick} />
          ))}
        </div>
      </ItemContainer>
    </>
  );
}

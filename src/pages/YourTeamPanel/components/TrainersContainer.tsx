import React, { useState } from "react";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import FilteredBlock from "../../../components/main-content-elements/FilteredBlock";
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import { useParams } from "react-router-dom";
import translation from "../components/locales/yourTeamPanel.json";
import { translationProps } from "../../../types/translationTypes";
import { useLanguageContext } from "../../../context/LanguageContext";
import Portal from "../../../components/Portal";
import AddTrainerWindow from "./AddTrainerWindow";
import EditTrainerWindow from "./EditTrainerWindow";

export type Trainer = {
  id?: string;
  firstName: string;
  secondName: string;
  team: string;
  uid: string;
  img: string | File;
};

const TrainersContainer = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const translate: translationProps = translation;
  const { language } = useLanguageContext();
  const [selectedModal, setSelectedModal] = useState(0);
  const { documents: Trainers } = useCollection("Trainers", ["uid", "==", id || user.uid]);
  const { documents: licenseTrainers } = useTeamLicenseCollection("Trainers");
  const [data, setData] = useState<Trainer | null>(null);
  const modalOptions = [
    { id: 1, component: <AddTrainerWindow setSelectedModal={setSelectedModal} /> },
    { id: 2, component: <EditTrainerWindow data={data as Trainer} setSelectedModal={setSelectedModal} /> },
  ];

  const editClick = (item: Trainer) => {
    setSelectedModal(2);
    setData(item);
  };

  return (
    <>
      <Portal>{modalOptions.map((item) => item.id === selectedModal && item.component)}</Portal>
      <button className="btn primary-btn" onClick={() => setSelectedModal(2)}>
        {translate.addTrainer[language]}
      </button>
      <ItemContainer>
        <div className="your-team-catalog-container d-flex flex-wrap">
          {Trainers?.map((item, i) => (
            <FilteredBlock editClick={editClick} key={i} item={item} type={"Trainers"} />
          ))}
          {licenseTrainers?.map((item: Trainer, i: number) => (
            <FilteredBlock editClick={editClick} key={i} item={item} type={"Trainers"} />
          ))}
        </div>
      </ItemContainer>
    </>
  );
};

export default TrainersContainer;

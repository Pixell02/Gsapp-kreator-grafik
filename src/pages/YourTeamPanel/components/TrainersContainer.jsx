import React from "react";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";
import FilteredBlock from "../../../components/main-content-elements/FilteredBlock"
import useTeamLicenseCollection from "../../../hooks/useTeamLicenseCollection";

const TrainersContainer = ({editClick}) => {

  const { user } = useAuthContext()
  const { documents: Trainers } = useCollection("Trainers", ["uid", "==", user.uid])
  const { documents: licenseTrainers } = useTeamLicenseCollection("Trainers");

  return (
    <div className="your-team-catalog-container d-flex flex-wrap">
      {Trainers?.map((item, i) => (
        <FilteredBlock editClick={editClick} key={i} item={item} type={"Trainers"} />
      ))}
      {licenseTrainers?.map((item, i) => (
        <FilteredBlock editClick={editClick} key={i} item={item} type={"Trainers"} />
      ))}
    </div>
  );
};

export default TrainersContainer;

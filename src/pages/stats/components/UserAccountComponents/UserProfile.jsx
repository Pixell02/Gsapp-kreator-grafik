import { useState } from "react";
import ItemContainer from "../../../../components/main-content-elements/ItemContainer";
import Title from "../../../../components/main-content-elements/Title";
import Licenses from "../../../Account/components/Licenses";
import "../../../Account/components/MainAccount.css";
import LicenseEdit from "./UserAccountComponents/LicenseEdit";
import MultiAccountContainer from "./UserAccountComponents/MultiAccountContainer";
// import UserStats from "./UserAccountComponents/UserStats";

import PlayerContent from "../../../Players/components/PlayerContent";
import OpponentContent from "../../../Opponents/components/OpponentContent";
import YourTeamContainer from "../../../YourTeamPanel/components/YourTeamContainer";
import UserInformation from "../../../Account/components/UserInformation";
import IndividualPosters from "../../../YourCatalog/components/IndividualPosters";

export default function UserProfile(props) {
  const [data, setData] = useState(null);
  const [editLicense, setEditLicense] = useState(false);

  const handleEditLicense = (license) => {
    setEditLicense(true);
    setData(license);
  };

  return (
    <div className="main-content">
      {data && editLicense && (
        <div className="d-flex h-100 position-absolute w-100 justify-content-center align-items-center">
          <LicenseEdit email={props.email} License={data} open={editLicense} onClose={() => setEditLicense(false)} />
        </div>
      )}

      <div className="ml-2 d-flex flex-column w-100">
        <UserInformation userInfo={props.email} />
        <div>
          <div className="yourPoster-container">
            <Licenses License={props.License} />
            <button className="btn ml-5 w-25 mt-2" onClick={() => handleEditLicense(props.License)}>
              Edytuj
            </button>
            {props?.email && <MultiAccountContainer email={props.email} />}
            <IndividualPosters userLicense={props.License} />
          </div>

          <div className="favorite-theme-container">
            <Title title="Ulubione motywy" />
            <ItemContainer></ItemContainer>
          </div>
          <YourTeamContainer />
          <PlayerContent />
          <OpponentContent />
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import ReturnButton from "../../../components/ReturnButton";
import Title from "../../../components/main-content-elements/Title";
import "./MainYourTeamPanel.css";
import YourTeamContainer from "./YourTeamContainer";
import translate from "./locales/yourTeamPanel.json";
import TrainersContainer from "./TrainersContainer";
import { useLanguageContext } from "../../../context/LanguageContext";
function MainYourTeamPanel() {
  const { language } = useLanguageContext();

  const navigate = useNavigate();
  return (
    <>
      <div className="main-content">
        <div className="ml-5 w-100">
          <ReturnButton />
          <div className="d-flex align-items-center">
            <div className="w-100">
              <Title title={translate.title[language]} />
            </div>
            <div className="empty-container"></div>
            <div className="d-flex guide-btn-container">
              <button onClick={() => navigate(`/${language}/guide`)} className="btn primary-btn">
                {translate.guide[language]}
              </button>
            </div>
          </div>
          <YourTeamContainer />
          <div className="mt-5">
            <TrainersContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainYourTeamPanel;

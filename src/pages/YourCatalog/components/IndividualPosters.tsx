import { Link } from "react-router-dom";
import ItemContainer from "../../../components/main-content-elements/ItemContainer";
import Title from "../../../components/main-content-elements/Title";
import useTeamPosters from "../hooks/useTeamPosters";
import translation from "../locales/translate.json";
import { useLanguageContext } from "../../../context/LanguageContext";
import { translationProps } from "../../../types/translationTypes";
import { License } from "../../../context/LicenseContext";

const IndividualPosters = ({ userLicense }: { userLicense?: License }) => {
  const { yourPoster, teamPosters } = useTeamPosters(userLicense);
  const { language } = useLanguageContext();
  const translate: translationProps = translation;

  return (
    <div>
      <div className="ml-5 d-flex flex-column">
        <div style={{ fontSize: "25px", marginBottom: "20px" }}> {translate.yourPosters[language]}</div>
        <ItemContainer>
          {yourPoster && yourPoster?.length > 0 ? (
            yourPoster.map((poster) => (
              <>
                <div className="item-category-window">
                  <Link to={`/${language}/creator/${poster.uuid}`}>
                    <div className="name-content">
                      <span className="name-content">{poster.name}</span>
                    </div>
                    <div className="image-category-content">
                      {poster.src && <img src={poster.src} alt={poster.name} />}
                    </div>
                  </Link>
                </div>
              </>
            ))
          ) : (
            <p>{translate.noContent[language]}</p>
          )}
        </ItemContainer>
        {teamPosters && teamPosters?.length > 1 && (
          <>
            <Title title="plakaty drużyny" />
            <ItemContainer>
              {teamPosters?.map((poster) => (
                <>
                  <div className="item-category-window">
                    <Link to={`/${language}/creator/${poster.uuid}`}>
                      <div className="name-content">
                        <span className="name-content">{poster.name}</span>
                      </div>
                      <div className="image-category-content">
                        {poster.src && <img src={poster.src} alt={poster.name} />}
                      </div>
                    </Link>
                  </div>
                </>
              ))}
            </ItemContainer>
          </>
        )}
      </div>
    </div>
  );
};

export default IndividualPosters;

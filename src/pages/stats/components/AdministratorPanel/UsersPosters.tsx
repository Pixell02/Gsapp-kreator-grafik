import { useNavigate } from "react-router-dom";
import PosterLinkBlock from "../../../../components/main-content-elements/PosterLinkBlock";
import Title from "../../../../components/main-content-elements/Title";
import "../../Stats.css";
import { useLanguageContext } from "../../../../context/LanguageContext";
import usePosterFilter from "./hooks/usePosterFilter";
import { poster } from "../../../Calendar/components/PosterBlock";

export default function UsersPosters() {
  const navigate = useNavigate();
  const { usersPosters } = usePosterFilter();
  const { language } = useLanguageContext();

  const editClick = (item: poster) => {
    navigate(`/${language}/posterCreator/${item.uuid}`);
  };
  return (
    <div className="usersPosters-container mt-5 bg-light">
      <div className="pt-2 ml-5">
        <Title title="Grafiki użytkowników" />
      </div>
      <div className="users-poster-container">
        {usersPosters &&
          usersPosters.map((user) => (
            <div className="users-container">
              <span className="users-id">{`${user?.email} (${user?.uid})` || ""}</span>

              <div className="users-posters">
                {user.posters.map((userPoster, i) => (
                  <>
                    <PosterLinkBlock
                      key={i}
                      link={`/${language}/creator/${userPoster.uuid}`}
                      userPoster={userPoster}
                      editClick={editClick}
                      type={"yourCatalog"}
                    />
                  </>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

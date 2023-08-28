import "./WorkSpace.css";
import { useCollection } from "../../hooks/useCollection";
import { useRef} from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import background from "../../img/back.png";
import { exportImg } from "./components/exportImg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Canvas from "./Canvas";
import EditPanel from "./components2/EditPanel";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translate from "./locales/translate.json";
import usePosters from "./hooks/usePosters";
import useInitScale from "./hooks/useInitScale";
import useIsTheme from "./hooks/useIsTheme";
import AdminButton from "./components2/AdminButton";
function WorkSpace() {
  const { poster } = useParams();
  const fabricRef = useRef();
  const { user } = useAuthContext();
  const { language } = useContext(LanguageContext);
  const { documents: Licenses } = useCollection("user", ["uid", "==", user.uid]);
  const {dataURL, themeOption, selectThemes, setSelectThemes} = usePosters(poster)
  const { hasTheme } = useIsTheme();
  const { initScale } = useInitScale(dataURL);

  return (
    <>
      {Licenses && Licenses[0].license === "no-license" && (
        <div className="license-content">
          <p>
            Brak licencji <Link to="/offer">Kup dostęp</Link>
          </p>
        </div>
      )}
      {Licenses && Licenses[0].license !== "no-license" && (
        <div className="workspace-container">
          <div className="preview-container">
            <TransformWrapper minScale={0.1} initialScale={initScale} panning={{disabled: true}} >
              <TransformComponent>
                <div className="d-flex w-100 h-100">
                  {fabricRef && dataURL && (
                    <Canvas
                      posterBackGround={dataURL}
                      fabricRef={fabricRef}
                    />
                  )}
                </div>
              </TransformComponent>
            </TransformWrapper>
          </div>

          <div className="tools-container">
            <div className="workspace-title">
              <div className="d-flex flex-column mt-4">
                <AdminButton hasTheme={hasTheme} />
                <span className="workspace-title-container">Kreator</span>
              </div>
            </div>
            <div className="ms-5 me-5 mt-3">
              {/* Właściwy workspace */}
              {fabricRef && themeOption && selectThemes && (
                <EditPanel
                  fabricRef={fabricRef}
                  themeOption={selectThemes}
                  setSelectThemes={setSelectThemes}
                  themeOptions={themeOption}
                  posterBackground={dataURL}
                />
              )}
              <button
                className="btn primary-btn save"
                onClick={() => exportImg(Licenses, selectThemes, user, poster)}
              >
                {translate.save[language]}
              </button>
            </div>
            {Licenses && Licenses[0].license === "free-trial" && (
              <div className="license-place">
                <span className="license-content">
                  {translate.freeUsesFirstPart[language]} {Licenses[0].numberOfFreeUse}{" "}
                  {translate.freeUsesLastPart[language]}
                </span>
              </div>
            )}
            <div className="empty-field"></div>
            <div className="background-image">
              <img src={background} alt="background" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WorkSpace;

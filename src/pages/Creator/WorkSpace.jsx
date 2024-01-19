import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useAuthContext } from "../../hooks/useAuthContext";
import background from "../../img/back.png";
import Canvas from "./Canvas";
import "./WorkSpace.css";
import { exportImg } from "./components/exportImg";
import AdminButton from "./components2/AdminButton";
import EditPanel from "./components2/EditPanel";
import { CanvasContextProvider } from "./context/CanvasPropertiesContext";
import useInitScale from "./hooks/useInitScale";
import useIsTheme from "./hooks/useIsTheme";
import translate from "./locales/translate.json";
import { useLanguageContext } from "../../context/LanguageContext";
import { useDoc } from "../../hooks/useDoc";
import { useThemeContext } from "./context/ThemeContext";
function WorkSpace() {
  const { poster } = useParams();
  const fabricRef = useRef(null);
  const { user } = useAuthContext();
  const { language } = useLanguageContext();
  const { themeColor, dataURL } = useThemeContext();
  const { documents: Licenses } = useDoc("user", ["uid", "==", user.uid]);
  const { hasTheme } = useIsTheme();
  const { initScale } = useInitScale(dataURL);
  return (
    <CanvasContextProvider>
      {Licenses?.license === "no-license" && (
        <div className="license-content">
          <p>
            Brak licencji <Link to="/offer">Kup dostęp</Link>
          </p>
        </div>
      )}
      {Licenses?.license !== "no-license" && (
        <div className="workspace-container">
          <div className="preview-container">
            <TransformWrapper minScale={0.1} initialScale={initScale} panning={{ disabled: true }}>
              <TransformComponent>
                <div className="d-flex w-100 h-100">
                  {dataURL && <Canvas dataURL={dataURL} fabricRef={fabricRef} />}
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
              {dataURL && <EditPanel fabricRef={fabricRef} />}
              <button className="btn primary-btn save" onClick={() => exportImg(Licenses, themeColor, user, poster)}>
                {translate.save[language]}
              </button>
            </div>
            {Licenses?.license === "free-trial" && (
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
    </CanvasContextProvider>
  );
}

export default WorkSpace;

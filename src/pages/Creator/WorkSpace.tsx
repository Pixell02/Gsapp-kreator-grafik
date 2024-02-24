import { LegacyRef, useRef } from "react";
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
import translation from "./locales/translate.json";
import { useLanguageContext } from "../../context/LanguageContext";
import { useThemeContext } from "./context/ThemeContext";
import useCoords from "./hooks/useCoords";
import { translationProps } from "../../types/translationTypes";
import { useLicenseContext } from "../../context/LicenseContext";
function WorkSpace() {
  const { poster } = useParams();
  const fabricRef = useRef<LegacyRef<HTMLCanvasElement>>(null);
  const translate: translationProps = translation;
  const { user } = useAuthContext();
  const { language } = useLanguageContext();
  const { themeColor, dataURL } = useThemeContext();
  const { license } = useLicenseContext();
  const { coords } = useCoords();
  const { hasTheme } = useIsTheme();
  const { initScale } = useInitScale(dataURL as string);
  return (
    <CanvasContextProvider>
      {license?.license === "no-license" && (
        <div className="license-content">
          <p>
            Brak licencji <Link to="/offer">Kup dostęp</Link>
          </p>
        </div>
      )}
      {license?.license !== "no-license" && (
        <div className="workspace-container">
          <div className="preview-container">
            <TransformWrapper minScale={0.1} initialScale={initScale as number} panning={{ disabled: true }}>
              <TransformComponent>
                {dataURL && <Canvas dataURL={dataURL} fabricRef={fabricRef.current} coords={coords?.SponsorBlock} />}
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
              {dataURL && <EditPanel fabricRef={fabricRef} coords={coords} />}
              <button className="btn primary-btn save" onClick={() => exportImg(license, themeColor, user, poster)}>
                {translate.save[language]}
              </button>
            </div>
            {license?.license === "free-trial" && (
              <div className="license-place">
                <span className="license-content">
                  {translate.freeUsesFirstPart[language]} {license.numberOfFreeUse}{" "}
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
